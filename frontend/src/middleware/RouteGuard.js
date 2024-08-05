import React from "react";
import { Outlet, Navigate } from 'react-router-dom';

const RouterGuard = ()=> {
    const token = localStorage.getItem('auth-token')
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default RouterGuard