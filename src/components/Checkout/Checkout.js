import { useContext, useState } from 'react'
import './Checkout.scss'
import { CartContext } from '../../context/CartContext'
import { LoginContext } from '../../context/LoginContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { GoBack } from '../GoBack/GoBack'

export function Checkout () {
    const { total , clean } = useContext(CartContext)
    const { user } = useContext(LoginContext)
    const navigate = useNavigate()

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
        clean()
        navigate("/")
    }
   
    return (
        <div className='checkourContainer'>
            <GoBack/>
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
    )
}