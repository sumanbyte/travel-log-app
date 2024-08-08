import {useState } from 'react'
import AuthContext from './authContext'

const AuthState = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); 
    
    // currently logged in user for profile page
    const getUser = async ()=> {
        try{

            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/getuser`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const json = await response.json();
        setUser(json.user)
    }finally{
        setLoading(false);
    }
    console.log(loading)
    }

    return <AuthContext.Provider value={{user, getUser, loading}}>
        {children}
    </AuthContext.Provider>
}

export default AuthState