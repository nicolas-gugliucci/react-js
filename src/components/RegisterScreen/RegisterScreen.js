import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import './RegisterScreen.scss'



export function RegisterScreen () {
    const { register, user } = useContext(LoginContext)
    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: '',
        password: '',
        name: '',
        surname: ''
    })

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        register(values)
    }

    useEffect(()=>{
        if(user.email){
            navigate(-2)
        }
    },[user])

    return (
        <div className='register-screen'>
            <div className='register'>
                <h2>Registrate</h2>
                <hr/>

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
                        value={values.password}
                        type={'password'}
                        onChange={handleInputChange}
                        className='form-control my-3'
                        placeholder='Password'
                        name='password'
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

                    <button className='btn btn-primary' type='submit'>Sing up</button>
                    <Link to="/login">I'm already singed up, go to login</Link>
                </form>

            </div>
        </div>
    )
}