import { json } from "express";
import { db } from "../db.js";
import jwt from "jsonwebtoken";
export const getPosts = (req, res) => {
    const query = req.query.GameName
        ? "SELECT p.*, d.* FROM picture_item p LEFT JOIN description d ON p.GameID = d.GameID LEFT JOIN transaction t ON d.GameID = t.GameID AND p.GameID = d.GameID WHERE d.GameName=? AND t.GameID IS NULL ORDER BY d.GameID DESC"
        : "SELECT p.*, d.* FROM picture_item p LEFT JOIN description d ON p.GameID = d.GameID LEFT JOIN transaction t ON d.GameID = t.GameID AND p.GameID = d.GameID WHERE t.GameID IS NULL ORDER BY d.GameID DESC;";

    db.query(query, [req.query.GameName], (err, data) => {
        if (err) return res.send(err)
        return res.status(200).json(data.map((item, index) => ({ ...item, ...data[index] })))
    })
}

export const getOthers = (req, res) => {
    const query = "SELECT p.*, d.* FROM picture_item p LEFT JOIN description d ON p.GameID = d.GameID LEFT JOIN transaction t ON d.GameID = t.GameID AND p.GameID = d.GameID WHERE d.GameName=? AND p.GameID != ? AND t.GameID IS NULL ORDER BY RAND()"
    db.query(query, [req.params.gamename, req.params.id], (err, data) => {
        if (err) return res.send(err)
        return res.status(200).json(data.map((item, index) => ({ ...item, ...data[index] })))
    })
}

export const getWallet = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        const query = req.params.status === "true" ? "SELECT * FROM `users` u LEFT JOIN `seller` s ON s.ID=u.ID WHERE u.ID = ?" :
            "SELECT * FROM `users` u LEFT JOIN `buyer` b ON b.ID=u.ID WHERE u.ID = ?"
        db.query(query, [userInfo.id], (err, data) => {
            if (err) return res.send(err)
            return res.status(200).json(data[0])
        })
    })

}


export const getCarts = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        const query = "SELECT * FROM picture_item p JOIN description d JOIN cart c ON c.GameID = d.GameID AND c.GameID = p.GameID WHERE c.GameID = d.GameID AND c.BuyerID = ? ORDER BY c.GameID DESC";

        const query1 = "SELECT * FROM picture_item p JOIN description d JOIN cart c ON c.GameID = d.GameID AND c.GameID = p.GameID WHERE p.GameID = d.GameID AND c.BuyerID = ? ORDER BY c.GameID DESC";

        db.query(query, [userInfo.id], (err, data) => {
            if (err) return res.send(err)
            db.query(query1, [userInfo.id], (err, data1) => {
                if (err) return res.send(err)
                return res.status(200).json(data.map((item, index) => ({ ...item, ...data1[index] })))
            })
        })
    })
}

export const getTransaction = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        const query = "SELECT * FROM picture_item p JOIN description d JOIN transaction t JOIN idgame i ON t.GameID = i.GameID AND t.GameID = d.GameID AND t.GameID = p.GameID WHERE t.GameID = d.GameID AND t.BuyerID = ? ORDER BY t.TransactionID DESC";

        const query1 = "SELECT * FROM picture_item p JOIN description d JOIN transaction t JOIN idgame i ON t.GameID = i.GameID AND t.GameID = d.GameID AND t.GameID = p.GameID WHERE p.GameID = d.GameID AND t.BuyerID = ? ORDER BY t.TransactionID DESC";
        db.query(query, [userInfo.id], (err, data) => {
            if (err) return res.send(err)
            db.query(query1, [userInfo.id], (err, data1) => {
                if (err) return res.send(err)
                return res.status(200).json(data.map((item, index) => ({ ...item, ...data1[index] })))
            })
        })
    })
}

export const updateTransaction = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        const query = "UPDATE `transaction` SET `Status_detail` = ? WHERE `GameID` = ?"
        db.query(query, [req.body.Status, req.params.id], (err, data) => {
            if (err) return res.send(err)
            return res.status(200).json("Confirm Success!")
        })
    })
}

export const updateWallet = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        //const querysell = "UPDATE `seller` s LEFT JOIN `idgame` i ON s.ID = i.SellerID SET `Wallet` = `Wallet` + ? WHERE i.GameID = ?;";
        const querybuy = "UPDATE `Buyer` SET `Wallet` = `Wallet` - ? WHERE ID = ?";
        //const valuesS = [req.body.price, req.params.id]
        const valuesB = [req.body.price, req.body.buyerID]
        if (req.params.id === "true") {
            db.query("UPDATE `Buyer` SET `Wallet` = `Wallet` + ? WHERE ID = ?", [req.body.money, req.body.buyerID], (err, data) => {
                if (err) return res.send(err)
                return res.status(200).json("Updating Wallet Success!")
            })
        }
        else {
            db.query(querybuy, valuesB, (err, data) => {
                if (err) return res.send(err)
                return res.status(200).json("Updating Wallet Success!")
            })
        }
    })
}

export const updateTopUp = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        const query = "SELECT * FROM `Buyer` WHERE ID = ?"
        const query1 = "SELECT * FROM `Seller` WHERE ID = ?"
        const values = [req.body.money,req.body.userID]
        db.query(query,[req.body.userID],(err,data)=>{
            if (err) return res.send(err)
            if(data.length){
                db.query('UPDATE `Buyer` SET `wallet` = `wallet` + ? WHERE ID = ?',values,(err)=>{
                    if (err) return res.send(err)
                    return res.status(200).json("Updating Wallet Success!")
                })
            }
            else{
                db.query(query1,[req.body.userID],(err,data)=>{
                    if (err) return res.send(err)
                    if(data.length){
                        db.query('UPDATE `Seller` SET `wallet` = `wallet` + ? WHERE ID = ?',values,(err)=>{
                            if (err) return res.send(err)
                            return res.status(200).json("Updating Wallet Success!")
                        })
                    }
                    else{
                        res.status(409).json("ไม่มีผู้ใช้งานIDนี้อยู่");
                    }
                })
            }
        })


    })
}

export const updateWalletSell = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        const querysell = "UPDATE `seller` s LEFT JOIN `idgame` i ON s.ID = i.SellerID SET `Wallet` = `Wallet` + ? WHERE i.GameID = ?;";
        const valuesS = [req.body.price, req.body.ID]
        db.query(querysell, valuesS, (err, data) => {
            if (err) return res.send(err)
            return res.status(200).json("Updating Wallet Success!")
        })
    })
}

export const getPost = (req, res) => {
    const query = "SELECT * FROM seller s JOIN picture_item p LEFT JOIN idgame i ON s.id = i.SellerID AND p.GameID=i.GameID LEFT JOIN users u ON u.ID = i.SellerID LEFT JOIN description d ON d.GameID = i.GameID LEFT JOIN contact c ON c.GameID = i.GameID WHERE i.GameID = ?; "
    db.query(query, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data[0])
    })
}



export const addChatHistory = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid!")
        const buyerid =userInfo.id+"_GameID:"+req.body.gameid
        const query = "INSERT INTO `chat` (`BuyerID`, `SellerID`, `History`) VALUES (?)"
        const values = [
            buyerid,
            req.body.id,
            req.body.date,
        ]
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json("Add History Success!")
        })

    })

}

export const addTransaction = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid!")
        const query = "INSERT INTO `transaction` (`TransactionID`, `BuyerID`, `GameID`, `Price`, `Date_time`, `Status_detail`) VALUES (?)"
        const values = [
            null,
            userInfo.id,
            req.body.GameID,
            req.body.Price,
            req.body.Date,
            req.body.Status
        ]
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json("Transaction Success!")
        })

    })

}

export const addCart = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid!")
        const query = "INSERT INTO `cart` (`ItemID`, `BuyerID`, `GameID`) VALUES (?)"
        const values = [
            null,
            userInfo.id,
            req.body.GameID,
        ]
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json("ซื้อเสร็จสิ้นรอการยืนยัน")
        })
    })

}

export const removeCart = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid!")

        const GameID = req.params.id
        const query = "DELETE FROM cart WHERE `BuyerID` = ? AND `GameID` = ?"

        db.query(query, [userInfo.id, GameID], (err, data) => {
            if (err) return res.status(403).json("You can delete only your item in cart!")
            return res.json("Item in cart has been removed!")
        })
    })

}

export const addPost = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid!")
        db.query("SELECT MAX(GameID) as max FROM `idgame`", (err, data) => {
            var id = data[0].max + 1;
            if (data[0].max) {
                id = data[0].max + 1;
            }
            else {
                id = 1;
            }
            const query = "INSERT INTO idgame(`GameID`,`SellerID`, `Username`, `Password`, `date`) VALUES (?)"
            const values = [
                id,
                userInfo.id,
                req.body.Username,
                req.body.Password,
                req.body.Date
            ]
            db.query(query, [values], (err, data) => {
                if (err) return res.status(500).json(err)
                const discount = req.body.Discount<=100 && req.body.Discount >=0 ? req.body.Discount : 0;
                const query2 = "INSERT INTO description(`GameID`,`GameName`,`title`,`Desc`, `Real_Price`, `Discount`, `Show_Price`) VALUES (?)"
                const values2 = [
                    id,
                    req.body.GameName,
                    req.body.title,
                    req.body.Desc,
                    req.body.Real_Price,
                    discount,
                    req.body.Real_Price * (100 - discount) / 100
                ]
                db.query(query2, [values2])
                const query3 = "INSERT INTO picture_item(`pic_id`,`GameID`, `Picture`) VALUES (?)"
                const values3 = [
                    null,
                    id,
                    req.body.img
                ]
                db.query(query3, [values3])
                const query4 = "INSERT INTO `contact` (`GameID`, `contact`, `info`) VALUES (?)"
                const values4 = [
                    id,
                    req.body.contact,
                    req.body.info
                ]
                db.query(query4, [values4])
                return res.json("Post has been created.")
            })

        })
    })



}


export const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid!")

        const GameID = req.params.id
        const query = "DELETE FROM idgame WHERE `GameID` = ? AND `SellerID` = ?"

        db.query(query, [GameID, req.params.pid], (err, data) => {
            if (err) return res.status(403).json("You can delete only your post!")

            return res.json("Post has been deleted!")
        })
    })
}


export const updatePost = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid!")
        const postId = req.params.id
        const query = "UPDATE idgame SET `GameID` = ?, `SellerID` = ?, `Username` = ?, `Password` = ?, `Date` = ? WHERE `GameID` = ?"
        const values = [
            req.body.Username,
            req.body.Password,
            req.body.Date,
        ]

        db.query(query, [postId, userInfo.id, ...values, postId], (err, data) => {
            if (err) return res.status(500).json(err)
                const query2 = "UPDATE description SET `GameID`=?,`GameName`=?,`title`=?,`Desc`=?, `Real_Price`=?, `Discount`=?, `Show_Price`=? WHERE `GameID` = ?"
                const values2 = [
                    postId,
                    req.body.GameName,
                    req.body.title,
                    req.body.Desc,
                    req.body.Real_Price,
                    req.body.Discount,
                    req.body.Real_Price * (100 - req.body.Discount) / 100
                ]
                db.query(query2, [...values2, postId],(err)=>{
                    if (err) return res.status(500).json(err)
                })
                db.query("SELECT pic_id FROM `picture_item` WHERE `GameID` = ?", [postId],(err,data)=>{
                    if (err) return res.status(500).json(err)
                    const query3 = "UPDATE picture_item SET `pic_id`=?,`GameID`=?, `Picture`=? WHERE `GameID` = ?"
                    if(data.length){
                        const values3 = [
                            data[0].pic_id,
                            postId,
                            req.body.img
                        ]
                        db.query(query3, [...values3, postId],(err)=>{
                            if (err) return res.status(500).json(err)
                        })
                    }else{
                        if (err) return res.status(500).json(err)
                    }
                    
                })
                
                const query4 = "UPDATE `contact` SET `GameID`=?, `contact`=?, `info`=? WHERE `GameID` = ?"
                const values4 = [
                    postId,
                    req.body.contact,
                    req.body.info
                ]
                db.query(query4, [...values4, postId])
                return res.json("Post has been created.")
        })
    })
}