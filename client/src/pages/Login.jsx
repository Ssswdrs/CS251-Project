import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext);

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/")
    } catch (err) {
      setError(err.response.data)
    }
  }
  const showPass = e => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form action="">
        <label>
          <span class='label'>Username</span>
          <input type="text" placeholder='username' name='username' required onChange={handleChange} />
        </label>
        <label>
          <span class='label'>Password</span>
          <input type="password" placeholder='password' name='password' id='password' required onChange={handleChange} />
        </label>
        <span><input type="checkbox" onClick={showPass} />&nbsp;&nbsp;Show Password</span>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          หากยังไม่มีบัญชีผู้ใช้งาน โปรดลงทะเบียน {'=>'} <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login
