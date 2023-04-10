import { collection, getDocs, query, where } from 'firebase/firestore'
import './HistoricalOrders.scss'
import { db } from '../../firebase/config'
import { capitalize } from '../../helpers/capitalize'
import { LoginContext } from '../../context/LoginContext'
import { useContext, useEffect, useState } from 'react'
import { Loading } from '../Loading/Loading'
import { GoBack } from '../GoBack/GoBack'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function HistoricalOrders () {

    const { user } = useContext(LoginContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(user){
            const ordersRef = collection(db, 'orders')
            const q = query(ordersRef, where("user.email", "==", user.email))
        
            getDocs(q)
                .then((response) => {
                    if(response.docs.length){
                        const docs = response.docs.map((doc) =>{
                            return {...doc.data(), id: doc.id}
                        })
                        docs.sort((a,b) => b.date.toDate() - a.date.toDate());
                        setOrders(docs)
                    }
                })
                .catch((err) => {
                    const MySwal = withReactContent(Swal)
                    MySwal.fire({
                        icon: 'error',
                        html: "Oops something went wrong :( <br/>Please try again later",
                    })
                    console.log(err.message)
                })
                .finally(() => setLoading(false))

        }
    },[user])
             
    
    return (
        loading
            ?   <Loading/>
            :   orders.length
                ?   <div className='historicalOrders'>
                        <GoBack/>
                        <h2>Your orders:</h2>
                        <hr/>
                        {orders.map((orden) => 
                            <div key={orden.id}>
                                <div className='order'>
                                    <div className='info'>
                                        <h4><p className='subtitle'>{`Order id: ${(orden.id)}`}</p></h4>
                                        <h4><p className='subtitle'>Order date:</p>{` ${String(orden.date.toDate()).substring(4,15)}`}</h4>
                                        <h4><p className='subtitle'>Address:</p>{` ${capitalize(orden.user.address)}`}</h4>
                                    </div>
                                    <h4 className='itemsSum'><p className='subtitle'>Items:</p> 
                                        {orden.items.map((item)=> <p className='itemLine' key={`${item.id}_${item.size}`}>{`${capitalize(item.name)} - ${capitalize(item.color)}  | Size: ${capitalize(item.size)} | x${item.quantity}`}</p>)}
                                    </h4>
                                    <h4 className='price'><p className='subtitle'>Total of the order:</p>{` US$${orden.total}`}</h4>
                                </div>
                                <hr/>
                            </div>
                        )}
                    </div>  
                :   <div className='historicalOrders'>
                        <GoBack/>
                        <h2>You don't have any order yet</h2>
                    </div>
    )
}