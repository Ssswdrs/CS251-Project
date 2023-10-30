import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
const Menu = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className='Menu'>
            <Link className='link' to="/TopUp">
                {currentUser?.username === "admin"?(<h1>Top-up (Admin)</h1>):(<h1>Top-up</h1>)}
            </Link>
            <Link className='link' to="/Cart">
                <h1>My Cart</h1>
            </Link>
            <Link className='link' to="/Transaction">
                <h1>Transactions</h1>
            </Link>
            <Link className='link' to="/Changepass">
                <h1>Change Password</h1>
            </Link>
        </div>
    )
}

export default Menu
