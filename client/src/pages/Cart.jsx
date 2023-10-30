import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Cart = () => {
  const [posts, setCarts] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/cart/user`)
        setCarts(res.data)
        
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [])
  const handleRemove = async (id) => {
    try {
      await axios.delete(`/posts/cart/remove/${id}`);
      navigate("/Cart")
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalPrice = () => {
    const totalPrice = posts.reduce((sum, post) => sum + post.Show_Price, 0);
    return totalPrice;
  };

  return (
    <div className='Cart'>
      {posts.map(post => (
        <div className='post' key={post.pic_id}>
          <div className='img'>
            <Link className='link' to={`/post/${post.GameID}`}>
              <img src={`../uploads/${post.Picture}`} alt="" />
            </Link>
          </div>
          <div className='content'>
            <Link className='link' to={`/post/${post.GameID}`}>
              <h1>{post.title}</h1>
            </Link>
            <p className='price'>&nbsp;{post.Show_Price}&nbsp;บาท</p>

            <button onClick={() => handleRemove(post.GameID)}>Remove</button>
          </div>
        </div>
      ))}
      <p className='total-price'>ราคารวมทั้งหมด: {getTotalPrice()} บาท</p>
    </div>
  )
}

export default Cart
