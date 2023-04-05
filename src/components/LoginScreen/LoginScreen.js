import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import './LoginScreen.scss'
import { FcGoogle } from 'react-icons/fc'



export function LoginScreen () {
    const { login, googleLogin, user } = useContext(LoginContext)
    const navigate = useNavigate()
    
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(values)
    }

    useEffect(()=>{
        if(user.email){
            navigate(-1)
        }
    },[user])

    return (
        <div className='login-screen'>
            <div className='login'>
                <h2>Login</h2>
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

                    <button className='btn btn-primary' type='submit'>Login</button>
                    <Link to="/register">Sing up</Link>
                </form>

                <button className='btn btn-outline-primary' onClick={googleLogin}><FcGoogle/> Login with google</button>
            </div>
        </div>
    )
}