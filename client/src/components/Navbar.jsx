import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react'
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext)
    const [wallet, setWallet] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/wallet/user/${currentUser?.seller}`)
                setWallet(res.data)
                setTimeout(async () => {
                    if (res.data.Wallet == null) window.location.reload();
                }, 1000)

            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [currentUser?.seller])
    return (
        <div className='navbar'>
            <div className='container'>
                <div className='logo'>
                    <Link to="/"><img src={Logo} alt="" /></Link>
                </div>
                <div className='links'>
                    <Link className='link' to="/?GameName=rov">
                        <h6>ROV</h6>
                    </Link>
                    <Link className='link' to="/?GameName=valorant">
                        <h6>VALORANT</h6>
                    </Link>
                    <Link className='link' to="/?GameName=freefire">
                        <h6>FREE FIRE</h6>
                    </Link>
                    <Link className='link' to="/?GameName=apexlegend">
                        <h6>APEX LEGENDS</h6>
                    </Link>
                    <Link className='link' to="/?GameName=cookierunkingdom">
                        <h6>COOKIERUN KINGDOM</h6>
                    </Link>
                    <Link className='link' to="/?GameName=marvelsnap">
                        <h6>MARVEL SNAP</h6>
                    </Link>
                    <Link className='link' to="/Usermenu">
                        <span className='button-85'>{currentUser ? currentUser?.username : ""}</span>
                    </Link>

                    {currentUser ? (
                        <span className='logout' onClick={logout}>Logout</span>
                    ) : (
                        <Link className='link' to="login">Login</Link>
                    )}
                    {currentUser?.seller ? (
                        <span className='write'>
                            <Link className='link' to="/write">Sell</Link>
                        </span>
                    ) : ""}

                </div>
            </div>
            <p className='Wallet'>{currentUser ? wallet.Wallet + " บาท" : ""}</p>
        </div>
    )
}

export default Navbar