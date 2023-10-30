import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"
const Changepass = () => {
  const [inputs, setInputs] = useState({
    old_pass: "",
    new_pass: "",
    new_pass2: "",
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const showPass = e => {
    var x = document.getElementById("x");
    var y = document.getElementById("y");
    var z = document.getElementById("z");
    if (x.type === "password" && y.type === "password" && z.type === "password") {
      x.type = "text";
      y.type = "text";
      z.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
      z.type = "password";
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.put("/auth/Changepass", inputs)
      navigate("/")
    } catch (err) {
      setError(err.response.data)
    }

  }



  return (
    <div className='changepass'>
      <h1>Change Password</h1>
      <form action="">
        <input type="password" id='x' placeholder='current password' required name='old_pass' onChange={handleChange} />
        <input type="password" id='y' placeholder='new password' required name='new_pass' onChange={handleChange} />
        <input type="password" id='z' placeholder='new password again' required name='new_pass2' onChange={handleChange} />
        <span><input type="checkbox" onClick={showPass} />&nbsp;&nbsp;Show Password</span>
        <button onClick={handleSubmit}>confirm</button>
        {err && <p>{err}</p>}
      </form>
    </div>
  )
}

export default Changepass
