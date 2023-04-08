import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import './LoginScreen.scss'
import { FcGoogle } from 'react-icons/fc'
import { Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup';

const schema = Yup.object().shape({
    password: Yup.string()
                .required('Este campo es obligatorio')
                .min(6, 'Mínimo 6 caracteres')
                .max(30, 'Máximo 30 caracteres'),
    email: Yup.string()
                .email('El email es inválido')
                .required('Este campo es obligatorio')
})


export function LoginScreen () {
    const { login, googleLogin, user } = useContext(LoginContext)
    const navigate = useNavigate()

    const loginSubmit = (values) => {
        login(values)
    }

    useEffect(()=>{
        if(user.email){
            navigate("/")
        }
    },[user, navigate])

    return (
        <div className='login-screen'>
            <div className='login'>
                <h2>Login</h2>
                <hr/>
                <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={schema}
                        onSubmit={loginSubmit}
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
                                    value={values.password}
                                    type={'password'}
                                    onChange={handleChange}
                                    className='form-control my-3'
                                    placeholder='Password'
                                    name='password'
                                />
                                {errors.password && <p className="alert alert-danger">{errors.password}</p>}

                                <Button className='btn btn-success' type='submit' disabled={isSubmitting}>Login</Button>
                                <Link to="/register">Sing up</Link>
                            </form>
                        )}
                    </Formik>
                <button className='btn btn-outline-primary' onClick={googleLogin}><FcGoogle/> Login with google</button>
            </div>
        </div>
    )
}