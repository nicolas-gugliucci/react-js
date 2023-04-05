import { signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, provider } from "../firebase/config";

export const LoginContext = createContext()

export const LoginProvider = ({children}) => {
    const [user, setUser] = useState({
        email: null,
        name: null,
        logged: false,
        userid: null
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
                updateProfile(auth.currentUser, {
                    displayName: `${values.name} ${values.surname}`,
                })
                .then(() => {
                    login(values)
                })
            })
            .catch((err) => console.log(err.message))
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({
                    email: null,
                    name: null,
                    logged: false,
                    userid: null
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
                    userid: user.uid
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