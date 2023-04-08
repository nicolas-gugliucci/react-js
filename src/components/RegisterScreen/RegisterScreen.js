import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import './RegisterScreen.scss'
import { Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string()
                .required('Este campo es obligatorio')
                .min(3, 'Mínimo 3 caracteres')
                .max(30, 'Máximo 30 caracteres'),
    surname: Yup.string()
                .required('Este campo es obligatorio')
                .min(4, 'Mínimo 4 caracteres')
                .max(30, 'Máximo 30 caracteres'),
    password: Yup.string()
                .required('Este campo es obligatorio')
                .min(6, 'Mínimo 6 caracteres')
                .max(30, 'Máximo 30 caracteres'),
    email: Yup.string()
                .email('El email es inválido')
                .required('Este campo es obligatorio')
})


export function RegisterScreen () {
    const { register, user } = useContext(LoginContext)
    const navigate = useNavigate()

    const registerSubmit = (values) => {
        register(values)
    }

    useEffect(()=>{
        if(user.email){
            navigate("/")
        }
    },[user, navigate])

    return (
        <div className='register-screen'>
            <div className='register'>
                <h2>Registrate</h2>
                <hr/>
                <Formik
                        initialValues={{
                            email: '',
                            name: '',
                            surname: '',
                            password: ''
                        }}
                        validationSchema={schema}
                        onSubmit={registerSubmit}
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
                                <div className='buttonsContainer'>
                                    <Button className='btn outlineButton' type='submit' disabled={isSubmitting}>Sing up</Button>
                                    <Link className='linkButton' to="/login">I'm already singed up, go to login</Link>
                                </div>
                            </form>
                        )}
                    </Formik>
            </div>
        </div>
    )
}