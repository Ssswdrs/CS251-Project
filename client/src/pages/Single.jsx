import React, { useContext, useEffect, useState } from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import Menu from '../components/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState({});
  const [showFullPicture, setShowFullPicture] = useState(false);
  const [money, setMoney] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const GameID = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  const inputCart = {
    BuyerID: currentUser?.ID,
    GameID: GameID,
  };
  const inputTrans = {
    BuyerID: currentUser?.ID,
    GameID: GameID,
    Price: post.Show_Price,
    Date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    Status: "เงินอยู่ในระบบ รอการยืนยันจากผู้ซื้อจึงจะโอนให้ผู้ขาย",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        const res = await axios.get(`/posts/${GameID}`);
        const res1 = await axios.get(`/posts/wallet/user/${currentUser?.seller}`);
        if (!(/https:\/\/line\.me/.test(res.data.info) || /https:\/\/www\.instagram\.com\//.test(res.data.info) || /https:\/\/www\.facebook\.com\//.test(res.data.info))) {
          res.data.info = null
        }
        else if (/https:\/\/line\.me/.test(res.data.info)) {
          res.data.contact = "Line"
        }
        else if (/https:\/\/www\.instagram\.com\//.test(res.data.info)) {
          res.data.contact = "IG"
        }
        else if (/https:\/\/www\.facebook\.com\//.test(res.data.info)) {
          res.data.contact = "Facebook"
        }
        setPost(res.data);
        setMoney(res1.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [GameID, currentUser?.seller]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${GameID}/${post.ID}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const handleCart = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to add this item to your Cart?");
    if (confirmed) {
      try {
        await axios.post("/posts/cart", inputCart);
        var elements = document.getElementsByClassName('button-85');
        if (elements.length > 0) {
          var element = elements[0];
          var originalText = element.innerHTML; // Store the original inner text
          element.innerHTML = "&#10145;&#65039;&#128722;In Cart";
          setTimeout(() => {
            element.innerHTML = originalText;
            navigate("/");
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChatHistory = async (sellerid, gameid) => {
    try {
      await axios.post(`/posts/chat/seller/buyer/addChatHistory` , {id:sellerid,gameid:gameid,date:"GameID: "+gameid+" Date: "+moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")})

    } catch (err) {
      console.log(err);
    }
  }

  const handleBuy = async (price, id) => {
    const confirmed = window.confirm("Are you sure you want to buy this item?");
    if (confirmed) {
      try {
        if (price <= money.Wallet) {
          await axios.delete(`/posts/cart/remove/${id}`);
          await axios.put(`/posts/money/update/${GameID}`, { price: price, buyerID: currentUser?.ID });
          await axios.post("/posts/transaction", inputTrans);

          var elements = document.getElementsByClassName('button-85');
          if (elements.length > 0) {
            var element = elements[0];
            var originalFontWeight = element.style.fontWeight;
            element.style.fontWeight = "bold";
            var originalColor = element.style.color;
            element.style.color = "#008000";
            var originalText = element.innerHTML;
            element.innerHTML = "In Transactions";
            setTimeout(() => {
              element.style.fontWeight = originalFontWeight;
              element.style.color = originalColor;
              element.innerHTML = originalText;
              navigate("/");
              window.location.reload();
            }, 1000);
          }
        } else {
          window.alert("เงินไม่เพียงพอ");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const openFullPicture = () => {
    setShowFullPicture(true);
  };

  const closeFullPicture = () => {
    setShowFullPicture(false);
  };

  return (
    <div className="single">
      <div className="content">
        <img
          src={`../uploads/${post?.Picture}`}
          alt=""
          onClick={openFullPicture}
        />
        {showFullPicture && (
          <div className="full-picture-modal">
            <div className="full-picture-content">
              <img
                src={`../uploads/${post?.Picture}`}
                alt=""
                onClick={closeFullPicture}
              />
              <button className="closeButt" onClick={closeFullPicture}>X</button>
            </div>
          </div>
        )}
        <div className="user">
          {/* {post.userImg && <img src={post.userImg} alt="" />} */}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.Date).fromNow()}</p>
          </div>
          {currentUser ? (
            (currentUser?.ID === post.ID && currentUser?.seller && currentUser?.username) || currentUser?.username === "admin" ? (
              <div className="edit">
                <Link to={`/write?edit=2`} state={post}>
                  <img src={Edit} alt="" />
                </Link>
                <img onClick={handleDelete} src={Delete} alt="" />
              </div>
            ) : (!currentUser?.seller ? (
              <div>&nbsp;&nbsp;
                <button className="buttonA" onClick={handleCart}>Add to Cart</button>&nbsp;&nbsp;&nbsp;
                <button className="buttonB" onClick={() => handleBuy(post.Show_Price, GameID)}>Buy now</button>
              </div>
            ) : null)
          ) : null}
        </div>
        <h3>{post.title}&nbsp;</h3>
        <h4>{post.Real_Price}&nbsp;บาท&nbsp;ลด&nbsp;{post.Discount}%&nbsp;เหลือเพียง&nbsp;{post.Show_Price}&nbsp;บาท</h4>
        <p>{getText(post.Desc)}</p>
        <a href={post.info} rel="noopener noreferrer" onClick={() => handleChatHistory(post.SellerID,GameID)} className='button-89'>
          <p><b>{post.contact}</b></p>
        </a>

      </div>
      <Menu GameName={post.GameName} />
    </div>
  );
};

export default Single;
