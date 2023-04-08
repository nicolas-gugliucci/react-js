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

    const googleLogin = () => {
        signInWithPopup(auth, provider)
    }

    const login = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .catch((err) => console.log(err))
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