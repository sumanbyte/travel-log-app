import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';
import SignupImg from '../assets/img/signup.svg';

const Signup = () => {
  const { setShow, setAlert } = useAlert();
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', email: '', password: '', cpassword: '' });

  console.log("Signup component is rendering");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (data.password !== data.cpassword) {
      setShow(true);
      setAlert({
        color: 'danger',
        type: 'Failure',
        message: 'Password and Confirm Password Must Match'
      });
    } else {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await response.json();

      if (res.success) {
        localStorage.setItem('auth-token', res.authToken);
        setShow(true);
        setAlert({
          color: 'success',
          type: 'Success',
          message: res.message
        });
        navigate('/');
      } else {
        setShow(true);
        setAlert({
          color: 'danger',
          type: 'Failure',
          message: res.message
        });
      }
    }
  };

  const onChange = useCallback((e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }, [data]);

  return (
    <div className="container my-4 d-flex justify-content-between">
      <img className="col-md-4 login-signup-img" src={SignupImg} alt="Signup" width={500} height={500} />
      <form className="form-control-sm col-md-6 login-signup-form" onSubmit={handleSignup}>
        <h1 className="fs-2 mb-4 font-owsald">Create An Account on Travel Log</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={data.name} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={data.email} />
          <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={data.password} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} value={data.cpassword} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary btn-sm" disabled={!data.name || !data.email || !data.password || !data.cpassword}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
