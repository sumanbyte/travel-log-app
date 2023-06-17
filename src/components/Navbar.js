import React, { useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { setAlert, setShow } = useAlert();
    const [navState, setNavState] = useState('shadow-5-strong')
    window.addEventListener('scroll', () => {
        let scroll = window.scrollY > 50
        if (scroll) {
            setNavState('bg-light')
        } else {
            setNavState('shadow-5-strong')
        }

    })

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setShow(true);
        setAlert({
            color: 'success',
            type: 'Success',
            message: 'Logged Out successfully',
        })
        window.location.reload()
        navigate('/')
    }
    return (


        <>
            <nav className={`navbar navbar-expand-lg fixed-top ${navState}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                localStorage.getItem('auth-token') &&
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/createpost' ? 'active' : ''}`} to="/createpost">Create Post</Link>
                                </li>
                            }

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/posts' ? 'active' : ''}`} to="/posts">Posts</Link>
                            </li>

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>

                        </ul>

                        {
                            !localStorage.getItem('auth-token') ? <>
                                <Link className="btn btn-primary mx-1" to='/login'>Login</Link>
                                <Link className="btn btn-success" to='/signup'>Create Account</Link>
                            </>
                                :
                                <>
                                    <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                                    <Link className='btn btn-success mx-2' to={'/profile'}>Profile</Link>
                                </>
                        }

                        {/* <Link className='btn btn-primary mx-1' onClick={handleLogout}>Log Out</Link> */}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar