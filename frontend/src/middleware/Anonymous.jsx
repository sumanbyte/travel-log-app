import { Outlet, Navigate } from 'react-router-dom';


const RouterGuard = ()=> {
    const token = localStorage.getItem('auth-token')
    return (
        token ? <Navigate to="/" /> : <Outlet/>
    )
}

export default RouterGuard