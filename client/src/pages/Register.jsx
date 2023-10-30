import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"
const Register = () => {
  const [inputs, setInputs] = useState({
    role: "",
    username: "",
    fname: "",
    lname: "",
    gender: "",
    tel: "",
    citizenid: "",
    bank: "",
    payno: "",
    email: "",
    password: "",
    province: "",
    district: "",
    street: "",
    zipcode: ""
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleChangePass = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("/auth/register", inputs)
      navigate("/login")
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
    <div className='register'>
      <h1>Register</h1>
      <form action="">
        <label>
          <span class='label'>You want to:</span>
          <select id="role" name='role' required onChange={handleChange}>
            <option value="">--YOU WANT TO--</option>
            <option value="sell">SELL</option>
            <option value="buy">BUY</option>
          </select>
        </label>

        <label>
          <span class='label'>Username</span>
          <input type="text" placeholder='Username' required name='username' onChange={handleChange} />
        </label>
        <label>
          <span class='label'>Firstname</span>
          <input type="text" placeholder='FirstName' required name='fname' onChange={handleChange} />
        </label>
        <label>
          <span class='label'>Lastname</span>
          <input type="text" placeholder='LastName' required name='lname' onChange={handleChange} />
        </label>
        <label>
          <span class='label'>Gender:</span>
          <select id="gender" name='gender' required onChange={handleChange}>
            <option value="">--Gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          <span class='label'>Tel No.</span>
          <input type="text" placeholder='Tel. No.' required name='tel' onChange={handleChange} />
        </label>
        <label>
          <span class='label'>CitizenID.</span>
          <input type="text" placeholder='CitizenID (ระบุเฉพาะผู้ขาย)' required name='citizenid' onChange={handleChange} />
        </label>
        <label>
          <span class='label'>Bank:</span>
          <select id="bank" name='bank' required onChange={handleChange}>
            <option value="">--Payment Method--</option>
            <option value="TrueWallet">True wallet</option>
            <option value="promptpay">Prompt pay</option>
            <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
            <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
            <option value="ธนาคารกรุงศรีอยุธยา">ธนาคารกรุงศรีอยุธยา</option>
            <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
            <option value="ธนาคารทหารไทย">ธนาคารทหารไทย</option>
            <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
            <option value="ธนาคารยูโอบี">ธนาคารยูโอบี</option>
            <option value="ธนาคารเกียรตินาคิน">ธนาคารเกียรตินาคิน</option>
          </select>
        </label>
        <label>
          <span class='label'>Payment No.</span>
          <input type="text" placeholder='Payment No.' required name='payno' onChange={handleChange} />
        </label>

        <label>
          <span class='label'>Province</span>
          <input type="text" placeholder='Province' required name='province' onChange={handleChange} />
        </label>
        <label>
          <span class='label'>District</span>
          <input type="text" placeholder='District' required name='district' onChange={handleChange} />
        </label>
        <label>
          <span class='label'>Street</span>
          <input type="text" placeholder='Street' required name='street' onChange={handleChange} />
        </label>
        <label>
          <span class='label'>Zipcode</span>
          <input type="text" placeholder='Zipcode' required name='zipcode' onChange={handleChange} />
        </label>
        <label>
          <span class='label'>Email</span>
          <input type="email" placeholder='Email' required name='email' onChange={handleChange} />
        </label>
        <label>
          <span class='label'>Password</span>
          <input type="password" placeholder='Password' required id='password' name='password' onChange={handleChangePass} />
        </label>
        <span><input type="checkbox" onClick={showPass} />&nbsp;&nbsp;Show Password</span>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          หากมีบัญชีผู้ใช้งานแล้ว {'=>'} <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register
