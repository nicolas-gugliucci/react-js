import { signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, provider } from "../firebase/config";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const LoginContext = createContext()

export const LoginProvider = ({children}) => {
    const [user, setUser] = useState({
        email: null,
        name: null,
        logged: false,
        userid: null,
        img: null
    })

    const MySwal = withReactContent(Swal)

    const googleLogin = () => {
        signInWithPopup(auth, provider)
            .catch((err) => {
                MySwal.fire({
                    icon: 'error',
                    html: "Oops something went wrong :( <br/>Please try again later",
                })
                console.log(err.message)
            })
    }

    const login = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .catch((err) => {
                if(err.message === "Firebase: Error (auth/user-not-found)."){
                    MySwal.fire({
                        icon: 'error',
                        title: <p>There is no user registered with this E-mail</p>,
                    })
                }else if(err.message === "Firebase: Error (auth/wrong-password)."){
                    MySwal.fire({
                        icon: 'error',
                        title: <p>Wrong password</p>,
                        html: "Please try again"
                    })
                }else{
                    MySwal.fire({
                        icon: 'error',
                        html: "Oops something went wrong :( <br/>Please try again later",
                    })
                }
                console.log(err.message)
            })
    }

    const register = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(()=>{
                login(values)
                updateProfile(auth.currentUser, {
                    displayName: `${values.name} ${values.surname}`,
                })
                .then(() => {
                    logout()
                    login(values)
                })
            })
            .catch((err) => {
                if(err.message === "Firebase: Error (auth/email-already-in-use)."){
                    const MySwal = withReactContent(Swal)
                    MySwal.fire({
                        icon: 'error',
                        title: <p>This E-mail is already registered</p>,
                    })
                }else{
                    MySwal.fire({
                        icon: 'error',
                        html: "Oops something went wrong :( <br/>Please try again later",
                    })
                }
                console.log(err.message)
            })
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({
                    email: null,
                    name: null,
                    logged: false,
                    userid: null,
                    img: null
                })
            })
            .catch((err) => {
                MySwal.fire({
                    icon: 'error',
                    html: "Oops something went wrong :( <br/>Please try again later",
                })
                console.log(err.message)
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    name: user.displayName,
                    logged: true,
                    userid: user.uid,
                    img: user.photoURL
                })
            } else {
                logout()
            }
        })
        // eslint-disable-next-line
    }, [])
    

    return (
        <LoginContext.Provider value={{
            user,
            register,
            login,
            logout,
            googleLogin
        }}>
            {children}
        </LoginContext.Provider>
    )
}