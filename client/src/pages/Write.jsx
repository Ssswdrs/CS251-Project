import React, { useState, useEffect, useContext } from 'react'
import ReactQuill from 'react-quill';
import axios from 'axios'
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../context/authContext'

const Write = () => {

  const state = useLocation().state
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.Desc || "");
  const [Username, setUser] = useState(state?.Username || "");
  const [Password, setPass] = useState(state?.Password || "");
  const [Real_Price, setPrice] = useState(state?.Real_Price || "");
  const [Discount, setDiscount] = useState(state?.Discount || "");
  const [contact, setContact] = useState(state?.contact || "");
  const [info, setContactId] = useState(state?.info || "");
  const [file, setFile] = useState(null);
  const [GameName, setCat] = useState(state?.GameName || "");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)


  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(200, 200);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post("/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async e => {
    e.preventDefault()
    const imgUrl = await upload()

    try {
      state
        ? await axios.put(`/posts/${state.GameID}`, {
          title,
          Desc: value,
          Username,
          Password,
          Real_Price,
          Discount,
          contact,
          info,
          GameName,
          img: file ? imgUrl : "",
          Date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        })
        : await axios.post(`/posts/`, {
          title,
          Desc: value,
          Username,
          Password,
          Real_Price,
          Discount,
          contact,
          info,
          GameName,
          img: file ? imgUrl : "",
          Date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className='editor' theme='snow' value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <h3>Username ของเกม</h3>
          <input type='text' placeholder='Username' autocomplete="off" value={Username} onChange={e => setUser(e.target.value)} />
          <h3>Password ของเกม</h3>
          <div className="password-input-container">
            <input type={showPassword ? 'text' : 'password'} autocomplete="new-password" placeholder='Password' value={Password} onChange={e => setPass(e.target.value)} />
            <div className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <h3>ราคา</h3>
          <input type='number' placeholder='Price' value={Real_Price} onChange={e => setPrice(e.target.value)} />
          <h3>ส่วนลด</h3>
          <input type='number' placeholder='Discount 0 - 100' value={Discount} onChange={e => setDiscount(e.target.value)} />
          <h3>ช่องทางติดต่อ</h3>
          <input type='text' placeholder='Contact' value={contact} onChange={e => setContact(e.target.value)} />
          <h3>ชื่อ/ไอดีของช่องทางติดต่อ</h3>
          <input type='text' placeholder='Link to contact(line, ig, facebook)' value={info} onChange={e => setContactId(e.target.value)} />
          <input style={{ display: "none" }} type="file" name='' id='file' onChange={e => setFile(e.target.files[0])} />
          {currentUser?.seller ?
            (<label className='file' htmlFor="file">Upload Image</label>) : ""}
          <div className="buttons">
            {/* <button>Save as a draft</button> */}
            {currentUser?.seller ?
              (<button onClick={handleClick}>Publish</button>) : ""}
          </div>
        </div>
        <div className="item">
          <h1>Game</h1>
          <div className="GameName">
            <input type="radio" checked={GameName === "rov"} name='GameName' value="rov" id='rov' onChange={e => setCat(e.target.value)} />
            <label htmlFor="rov">Rov</label>
          </div>
          <div className="GameName">
            <input type="radio" checked={GameName === "valorant"} name='GameName' value="valorant" id='valorant' onChange={e => setCat(e.target.value)} />
            <label htmlFor="valorant">Valorant</label>
          </div>
          <div className="GameName">
            <input type="radio" checked={GameName === "freefire"} name='GameName' value="freefire" id='freefire' onChange={e => setCat(e.target.value)} />
            <label htmlFor="freefire">Free Fire</label>
          </div>
          <div className="GameName">
            <input type="radio" checked={GameName === "apexlegend"} name='GameName' value="apexlegend" id='apexlegend' onChange={e => setCat(e.target.value)} />
            <label htmlFor="apexlegend">Apex Legend</label>
          </div>
          <div className="GameName">
            <input type="radio" checked={GameName === "cookierunkingdom"} name='GameName' value="cookierunkingdom" id='cookierunkingdom' onChange={e => setCat(e.target.value)} />
            <label htmlFor="cookierunkingdom">Cookierun Kingdom</label>
          </div>
          <div className="GameName">
            <input type="radio" checked={GameName === "marvelsnap"} name='GameName' value="marvelsnap" id='marvelsnap' onChange={e => setCat(e.target.value)} />
            <label htmlFor="marvelsnap">Marvel Snap</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write