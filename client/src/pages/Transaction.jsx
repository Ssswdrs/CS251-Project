import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Transaction = () => {
    const [posts, setTrans] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/transaction/user`)
                setTrans(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [])
    const inputTrans = {
        Status: "ยืนยันการซื้อขายเสร็จสิ้น"
    }
    const handleConfirm = async (id, price) => {
        const confirmed = window.confirm("Are you sure you want to buy this item?");
        if (confirmed) {
            try {
                await axios.put(`/posts/money/update/seller`, { price: price, ID: id });
                await axios.put(`/posts/transaction/update/${id}`, inputTrans)
                navigate("/Transaction")
                window.location.reload();
            } catch (err) {
                console.log(err);
            }

        }
    };
    const [hiddenPosts, setHiddenPosts] = useState([]);

    const handleToggle = (postId) => {
        setHiddenPosts((prevHiddenPosts) => {
            if (prevHiddenPosts.includes(postId)) {
                return prevHiddenPosts.filter((id) => id !== postId);
            } else {
                return [...prevHiddenPosts, postId];
            }
        });
    };
    return (
        <div className='Transaction'>
            {posts.map(post => (
                <div className='post' key={post.pic_id}>
                    <div className='img'>
                        <img src={`../uploads/${post.Picture}`} alt="" />
                    </div>
                    <div className='content'>
                        {/* <Link className='link' to={`/post/${post.GameID}`}>
                            <h1>{post.title}&nbsp;{post.Show_Price}&nbsp;บาท</h1>
                        </Link> */}
                        <h1>{post.title}&nbsp;{post.Show_Price}&nbsp;บาท</h1>
                        <button className='show' onClick={() => handleToggle(post.GameID)}>
                            Show Username & Password
                        </button>
                        {!hiddenPosts.includes(post.GameID) ? null : (
                            <div>
                                <p className='user_pass'>
                                    <b>Username:</b> {post.Username}&nbsp;&nbsp;&nbsp;
                                    <b>Password:</b> {post.Password}
                                </p>
                            </div>
                        )}

                        <h4>{post.Status_detail === "ยืนยันการซื้อขายเสร็จสิ้น" ? (post.Status_detail) : (<div>{post.Status_detail} <button className='confirm' onClick={() => handleConfirm(post.GameID, post.Show_Price)}>ยืนยัน</button></div>)}</h4>
                    </div>
                </div>
            ))}
            <a href='https://line.me/ti/p/8uMHK1LsvU' className='admin'>
                พบเจอปัญหาหลังการซื้อติดต่อแอดมิน กดที่ปุ่มนี้
            </a>
        </div>
    )
}

export default Transaction
