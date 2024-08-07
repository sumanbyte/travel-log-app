import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';
import NavLogo from "../assets/img/navlogo-next.png";
import { useRef } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { setAlert, setShow } = useAlert();
    const navbarCollapse = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setShow(true);
        setAlert({
            color: 'success',
            type: 'Success',
            message: 'Logged Out successfully',
        });
        window.location.reload();  // This will force a page reload on logout
        navigate('/');
    };

    const handleClick = () => {
        // Collapse the navbar if it's open
        navbarCollapse.current.classList.toggle("show")
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg max-width-boundary`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={NavLogo} alt="navlogo" width={110} height={35} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={navbarCollapse}>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/" onClick={handleClick}>Home</Link>
                            </li>
                            {localStorage.getItem('auth-token') && (
                                <li className="nav-item mx-2">
                                    <Link className={`nav-link ${location.pathname === '/createpost' ? 'active' : ''}`} to="/createpost" onClick={handleClick}>Create Post</Link>
                                </li>
                            )}
                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${location.pathname === '/posts' ? 'active' : ''}`} to="/posts" onClick={handleClick}>Posts</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about" onClick={handleClick}>About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('auth-token') ? (
                            <>
                                <Link className="btn btn-primary mx-1 btn-sm" to='/login'>Login</Link>
                                <Link className="btn btn-success btn-sm" to='/signup'>Create Account</Link>
                            </>
                        ) : (
                            <>
                                <button className='btn btn-danger btn-sm' onClick={handleLogout}>Logout</button>
                                <Link className='btn btn-success mx-2 btn-sm' to={'/profile'} onClick={handleClick}>Profile</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
