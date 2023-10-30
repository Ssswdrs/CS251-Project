import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
const Home = () => {
  const [posts, setPosts] = useState([])

  const GameID = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${GameID}`)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [GameID])
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='home'>
      <div className='posts'>
        {posts.map(post => (
          <div className='post' key={post.pic_id}>
            <div className='img'>
              <img src={`../uploads/${post.Picture}`} alt="" />
            </div>
            <div className='content'>
              <Link className='link' to={`/post/${post.GameID}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.Desc)}</p>
              <p className='price'>{post.Real_Price}&nbsp;บาท&nbsp;ลด&nbsp;{post.Discount}%&nbsp;เหลือเพียง&nbsp;{post.Show_Price}&nbsp;บาท</p>

              <Link className='link' to={`/post/${post.GameID}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home