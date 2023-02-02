import React, { useContext,useEffect,useState } from 'react'
import { auth } from "../firebase"
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [loading, setLoading] = useState()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user =>{
            
            setLoading(false);
            setCurrentUser(user);
            setLoading(true);
        });
        return unsubscribe;
    },[]);

    const [currentUser, setCurrentUser] = useState()

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
        
    }
    function logout(){
        return auth.signOut()
    }
 
    const value = {
        currentUser,
        signup,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {loading && children}
        </AuthContext.Provider>
    )
}
