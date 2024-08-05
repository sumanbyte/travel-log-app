import React, {useState } from 'react'
import AuthContext from './authContext'

const AuthState = ({ children }) => {
    const [user, setUser] = useState(null);
    
    // currently logged in user for profile page
    const getUser = async ()=> {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getuser`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const json = await response.json();
        setUser(json.user)
    }






    return <AuthContext.Provider value={{user, getUser}}>
        {children}
    </AuthContext.Provider>
}

export default AuthState