import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/authContext'
import axios from "axios"
const TopUp = () => {
  const [inputs, setInputs] = useState({
    money: "",
    id: ""
  })
  const [file, setFile] = useState(null);
  const [err, setError] = useState(null)

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const uploadSlip = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post(`/upload/slip/`, formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleTopup = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }



  const handleComfirmSlip = async e => {
    e.preventDefault()
    try {
      await axios.put(`/posts/money/update/topup/admin`, { money: inputs.money, userID: inputs.id })
      navigate("/TopUp")
      window.location.reload();
    } catch (err) {
      setError(err.response.data)
    }

  }


  return (
    <div className='topup'>
      <h1>Top-Up</h1>
      <form action="">
        <input style={{ display: "none" }} type="file" name='' id='file' onChange={e => setFile(e.target.files[0])} />
        {currentUser?.username === "admin" ? (<center><h5>ระบุจำนวนเงินที่จะเติม<br />(1 บาท ถึง 100000 บาท)</h5></center>) : ""}
        <label className='labeladmin'>
          {currentUser?.username === "admin" ? <span class='label'>ID ของ User</span> : ""}
          {currentUser?.username === "admin" ? (<input type="text" placeholder='ระบุ ID ของ User' required name='id' onChange={handleTopup} />) : ""}
        </label>
        <label className='labeladmin'>
          {currentUser?.username === "admin" ? <span class='label'>จำนวนเงิน</span> : <h4>แนบสลิปหลักฐานการโอน</h4>}
          {(currentUser && !currentUser?.seller) || currentUser?.username === "admin" ? currentUser?.username === "admin" ?
            (<input type="text" placeholder='ระบุจำนวนเงิน' required name='money' onChange={handleTopup} />) : (<label className='file' htmlFor="file">Upload Image</label>)
            : ""}
        </label>

        {currentUser?.username === "admin" ? <button onClick={handleComfirmSlip}>Confirm</button> : currentUser?.seller ? "" : <button onClick={uploadSlip}>Confirm</button>}
        {err && <p>{err}</p>}
      </form>
    </div>
  )
}

export default TopUp
