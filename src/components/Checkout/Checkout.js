import { useContext, useState } from 'react'
import './Checkout.scss'
import { CartContext } from '../../context/CartContext'
import { LoginContext } from '../../context/LoginContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { GoBack } from '../GoBack/GoBack'
import { db } from '../../firebase/config'
import { addDoc, collection, doc, documentId, getDoc, getDocs, query, updateDoc, where, writeBatch } from 'firebase/firestore'
import { Loading } from '../Loading/Loading'
import { capitalize } from '../../helpers/capitalize'

export function Checkout () {
    const { total , clean, cart } = useContext(CartContext)
    const { user } = useContext(LoginContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [orden, setOrden] = useState({
        user:'',
        items:'',
        total:'',
        date:''
    })
    

    const [values, setValues] = useState({
        email: user.email?user.email:'',
        name: user.name?user.name.split(" ")[0]:'',
        surname: user.name?user.name.split(" ")[1]:'',
        address: ''
    })

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //validaciones
        setLoading(true)
        setOrden({
            user: values,
            items: cart.map((item)=>({id: item.id, name: item.name, color: item.color, size: item.size, price: item.price, quantity: item.quantity})),
            total: total(),
            date: new Date(),
        })

        // const productsRef = collection(db, 'products')

        // cart.forEach((item) => {
        //     const docRef = doc(productsRef, item.id)
        //     getDoc(docRef)
        //         .then((doc) => {
        //             if(doc.data().stock >= item.quantity){
        //                 updateDoc(docRef,{
        //                     stock: doc.data().stock - item.quantity
        //                 })
        //             }
        //         })            
        // });

        const obtainSize = (selectedSize) => {
            if(sizes[sizes.indexOf(sizes.find((size) => size.name === selectedSize))].value === '-1'){
                return 0
            }else{
                return sizes[sizes.indexOf(sizes.find((size) => size.name === selectedSize))].value
            }
        }

        const sizes = [
            { name: 'XS', value: '0' },
            { name: 'S', value: '1' },
            { name: 'M', value: '2' },
            { name: 'L', value: '3' },
            { name: 'XL', value: '4' },
            { name: 'Unique size', value: '-1' }
        ];

        const batch = writeBatch(db)
        const ordersRef = collection(db, 'orders')
        const productsRef = collection(db, 'products')
        const outOfStock = []
        const itemsRef = query(productsRef, where(documentId(), 'in', cart.map((item) => item.id)))
        
        getDocs(itemsRef)
            .then((response) => {
                response.docs.forEach((doc) => {
                    const item = cart.find((item) => item.id === doc.id)
                    if(doc.data().availability.stock[obtainSize(item.size)] >= item.quantity){
                        batch.update(doc.ref,{
                            availability: {stock: [obtainSize(item.size)] : doc.data().availability.stock[obtainSize(item.size)] - item.quantity}
                        })
                    }else{
                        outOfStock.push(item)
                    }
                })
                if (outOfStock.length === 0){
                    batch.commit()
                        .then(() => {
                            addDoc(ordersRef, orden)
                                .then((doc)=>{
                                    setOrderId(doc.id)
                                    clean()
                                    setLoading(false)
                                })
                        })
                }else{
                    alert("hay items sin stock")
                }
            })
    }

    if(orderId){
        return(
            <div>
                <h2>Your order has been registered successfully</h2>
                <h3>{`Name: ${capitalize(orden.user.name)} ${capitalize(orden.user.surname)}`}</h3>
                <h4>{`Address: ${capitalize(orden.user.address)}`}</h4>
                
                <h4>Items: 
                    {orden.items.map((item)=> <p key={item.id}>{`${capitalize(item.name)} - ${capitalize(item.color)} x${item.quantity}`}</p>)}
                </h4>
                <h3>{`Total of the order: US$${orden.total}`}</h3>
                <h2>{`Keep with you your order id: ${orderId}`}</h2>
                <Link to="/">Go back to home</Link>
            </div>
        )
    }else if(cart.length === 0){
        navigate(-1)
    }

    return (
        loading
            ? <Loading/>
            : <div>
                <GoBack/>
                <div className='checkoutContainer'>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={values.email} 
                            type={'text'}
                            onChange={handleInputChange}
                            className='form-control'
                            placeholder='E-mail'
                            name='email'
                        />
                        <input 
                            value={values.name}
                            type={'text'}
                            onChange={handleInputChange}
                            className='form-control my-3'
                            placeholder='First name'
                            name='name'
                        />
                        <input 
                            value={values.surname}
                            type={'text'}
                            onChange={handleInputChange}
                            className='form-control my-3'
                            placeholder='Surname'
                            name='surname'
                        />
                        <input 
                            value={values.address}
                            type={'text'}
                            onChange={handleInputChange}
                            className='form-control my-3'
                            placeholder='Address'
                            name='address'
                        />
                        <Button variant='outline-success' type='submit'>{`Buy US$${total()}`}</Button>
                    </form>
                </div>
            </div>
    )
}