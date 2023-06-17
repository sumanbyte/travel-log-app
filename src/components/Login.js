import React, { useState, } from 'react'
import {useNavigate} from 'react-router-dom'
import useAlert from '../hooks/useAlert'

const Login = () => {
  const [data, setData] = useState({email: '', password: ''})
  const {setShow, setAlert} = useAlert()
  const navigate = useNavigate()

  const URL = 'http://localhost:3000'
  const handleLogin = async (e) => {
    e.preventDefault()
    const response = await fetch(`${URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const res = await response.json();
    if(res.success){
      localStorage.setItem('auth-token', res.authToken);
      setShow(true);
      setAlert({
        color: 'success',
        type: 'Success',
        message: res.message
      })
      navigate('/')
    }else{
      setShow(true);
      setAlert({
        color: 'danger',
        type: 'Failure',
        message: res.message
      })
    }
  
  }

  const onChange = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

  return (
    <div className='container'>
      <form className='margin-top-all'>
        <h1 className='my-3'>Login to Travel Log</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={onChange} value={data.email}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={onChange} value={data.password}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
        </div>
        <button type="submit" disabled={data.email.length && data.password.length > 0 ? false : true} className="btn btn-primary" onClick={handleLogin}>Login</button>
      </form>
    </div>
  )
}

export default Login