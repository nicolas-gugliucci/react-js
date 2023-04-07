import { useContext, useState } from 'react'
import './Checkout.scss'
import { CartContext } from '../../context/CartContext'
import { LoginContext } from '../../context/LoginContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { GoBack } from '../GoBack/GoBack'
import { db } from '../../firebase/config'
import { addDoc, collection, documentId, getDocs, query, where, writeBatch } from 'firebase/firestore'
import { Loading } from '../Loading/Loading'
import { capitalize } from '../../helpers/capitalize'
import { Formik } from 'formik'
import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string()
                .required('Este campo es obligatorio')
                .min(4, 'Mínimo 4 caracteres')
                .max(30, 'Máximo 30 caracteres'),
    surname: Yup.string()
                .required('Este campo es obligatorio')
                .min(4, 'Mínimo 4 caracteres')
                .max(30, 'Máximo 30 caracteres'),
    address: Yup.string()
                .required('Este campo es obligatorio')
                .min(6, 'Mínimo 6 caracteres')
                .max(30, 'Máximo 30 caracteres'),
    email: Yup.string()
                .email('El email es inválido')
                .required('Este campo es obligatorio')
})


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
    
    const ordermaker = (values) => {
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
                        const dataSize = doc.data().availability.size
                        let newStock = doc.data().availability.stock
                        newStock[obtainSize(item.size)] = doc.data().availability.stock[obtainSize(item.size)] - item.quantity
                        batch.update(doc.ref,{
                            availability: {stock: newStock, size: dataSize}
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
                                })
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                }else{
                    alert("hay items sin stock")
                }
            })
            
    }

    if(orderId){
        return(
            <div className='orderSumContainer'>
                <div className='orderSum'>
                    <h2 className='title'>Your order has been registered successfully!</h2>
                    <h4><p className='subtitle'>Name:</p>{` ${capitalize(orden.user.name)} ${capitalize(orden.user.surname)}`}</h4>
                    <h4><p className='subtitle'>Address:</p>{` ${capitalize(orden.user.address)}`}</h4>
                    
                    <h4 className='itemsSum'><p className='subtitle'>Items:</p> 
                        {orden.items.map((item)=> <p className='itemLine' key={item.id}>{`${capitalize(item.name)} - ${capitalize(item.color)}  | Size: ${capitalize(item.size)} | x${item.quantity}`}</p>)}
                    </h4>
                    <h4><p className='subtitle'>Total of the order:</p>{` US$${orden.total}`}</h4>
                    <h3 className='title'>{`Save your order id: `}<strong>{orderId}</strong></h3>
                    <Button variant='outline-primary' className='buttonHome'><Link to="/">Go back home</Link></Button>
                </div>
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
                    <Formik
                        initialValues={{
                            email: user.email?user.email:'',
                            name: user.name?user.name.split(" ")[0]:'',
                            surname: user.name?user.name.split(" ")[1]:'',
                            address: ''
                        }}
                        validationSchema={schema}
                        onSubmit={ordermaker}
                    >
                        {( {values, errors, handleChange, handleSubmit, isSubmitting} ) => (
                            <form onSubmit={handleSubmit}>
                                <input 
                                    value={values.email} 
                                    type={'text'}
                                    onChange={handleChange}
                                    className='form-control'
                                    placeholder='E-mail'
                                    name='email'
                                />
                                {errors.email && <p className="alert alert-danger">{errors.email}</p>}

                                <input 
                                    value={values.name}
                                    type={'text'}
                                    onChange={handleChange}
                                    className='form-control my-3'
                                    placeholder='First name'
                                    name='name'
                                />
                                {errors.name && <p className="alert alert-danger">{errors.name}</p>}

                                <input 
                                    value={values.surname}
                                    type={'text'}
                                    onChange={handleChange}
                                    className='form-control my-3'
                                    placeholder='Surname'
                                    name='surname'
                                />
                                {errors.surname && <p className="alert alert-danger">{errors.surname}</p>}

                                <input 
                                    value={values.address}
                                    type={'text'}
                                    onChange={handleChange}
                                    className='form-control my-3'
                                    placeholder='Address'
                                    name='address'
                                />
                                {errors.address && <p className="alert alert-danger">{errors.address}</p>}

                                <Button variant='outline-success' type='submit' disabled={isSubmitting}>{`Buy US$${total()}`}</Button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
    )
}