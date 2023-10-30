import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
const Menu = ({ GameName }) => {
    const [posts, setOthers] = useState([])
    const location = useLocation()
    const GameID = location.pathname.split("/")[2];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/other/${GameName}/${GameID}`)
                setOthers(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [GameName,GameID])

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    const handleClick = async (id) => {
            try {
              const res = await axios.get(`/posts/other/${GameName}/${id}`);
              setOthers(res.data);
            } catch (err) {
              console.log(err);
            }
    };

    return (
        <div className='menu'>
            <h1>ไอดีอื่นๆ ที่คุณอาจสนใจ</h1>
            {posts.slice(0, 3).map(post => (
                <div className="post" key={post.id}>
                    <Link className='link' to={`/post/${post.GameID}`}>
                        <img src={`../uploads/${post.Picture}`} alt="" onClick={() => handleClick(post.GameID)} />
                    </Link>
                    <h2>{getText(post.title)}</h2>
                    <h4>{post.Real_Price}&nbsp;บาท&nbsp;ลด&nbsp;{post.Discount}%&nbsp;เหลือเพียง&nbsp;{post.Show_Price}&nbsp;บาท</h4>
                    <Link className='link' to={`/post/${post.GameID}`}>
                        <button onClick={handleClick}>Read More</button>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Menu