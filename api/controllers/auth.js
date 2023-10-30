import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {
    if (req.body.role == "sell") {
        if (req.body.username == "" || req.body.fname == "" || req.body.lname == "" || req.body.gender == "" || req.body.tel == "" || req.body.citizenid == "" || req.body.citizenid == null || req.body.bank == "" || req.body.payno == "" || req.body.email == "" || req.body.password == "") {
            return res.status(409).json("กรอกข้อมูลให้ครบทุกช่อง")
        }
    }
    else if (req.body.role == "buy") {
        if (req.body.username == "" || req.body.fname == "" || req.body.lname == "" || req.body.gender == "" || req.body.tel == "" || req.body.email == "" || req.body.password == "") {
            return res.status(409).json("กรอกข้อมูลให้ครบทุกช่อง")
        }
    }
    else {
        return res.status(409).json("กรอกข้อมูลให้ครบทุกช่อง")
    }
    //CHECK EXISTING USER
    const query = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(query, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("มีผู้ใช้งาน Username หรือ Email นี้อยู่แล้ว");
        db.query("SELECT * FROM seller WHERE CitizenID = ?", [req.body.citizenid], (err, data) => {
            if (err) return res.json(err)
            if (data.length) return res.status(409).json("มีผู้ขายที่ใช้เลขประชาชน/Username/Emailนี้อยู่แล้ว");

            //Hash the password and create user
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            var id = 0;
            db.query("SELECT MAX(ID) as max FROM `users`", (err, data) => {
                if (data[0].max) {
                    id = data[0].max + 1;
                }
                else {
                    id = 1;
                }
                const query = "INSERT INTO `users` (`ID`, `username`, `FirstName`, `LastName`, `Gender`, `Tel`, `email`, `password`) VALUES (?)"
                const values = [
                    id,
                    req.body.username,
                    req.body.fname,
                    req.body.lname,
                    req.body.gender,
                    req.body.tel,
                    req.body.email,
                    hash,
                ]
                db.query(query, [values], (err, data) => {
                    if (err) return res.json(err)
                    else if (req.body.role === 'buy') {
                        db.query("INSERT INTO `buyer` (`ID`) VALUES (?)", id)
                    }
                    else if (req.body.role === 'sell') {
                        db.query("INSERT INTO `seller` (`ID`, `CitizenID`, `Payment_Method`, `Payment_No`) VALUES (?)", [[id, req.body.citizenid, req.body.bank, req.body.payno]])
                    }
                    db.query("INSERT INTO `address` (`ID`, `Province`, `District`, `Street`, `Zipcode`) VALUES (?)", [[id, req.body.province, req.body.district, req.body.street, req.body.zipcode]], (err, data) => {
                        return res.status(200).json("สร้างบัญชีผู้ใช้สำเร็จ")
                    })
                });
            })
        })
    })
};

export const login = (req, res) => {
    //CHECK USER

    const query = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(query, [req.body.username, req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("ไม่พบบัญชีผู้ใช้งานนี้")
        let id = data[0].ID;
        data[0].seller = false;
        db.query("SELECT * FROM `users` JOIN `seller` WHERE seller.ID=? AND users.ID=?", [data[0].ID, data[0].ID], (err, data) => {
            if (data.length) {
                data[0].seller = true;
                //Check password
                const isPwCorrect = bcrypt.compareSync(req.body.password, data[0].password);
                if (!isPwCorrect) return res.status(400).json("Username หรือ รหัสผ่าน ไม่ถูกต้อง")
                const token = jwt.sign({ id: data[0].ID }, "jwtkey");
                const { password, ...other } = data[0]; // เปลี่ยนข้อมูลที่เป็นรหัสผ่านที่จะเก็บเป็นคุกกี้ให้เป็นข้อมูลอื่น/ค่าอื่น
                res.cookie("access_token", token, {
                    httpOnly: true
                }).status(200).json(other)
            }
            else {
                db.query("SELECT * FROM `users` JOIN `buyer` WHERE buyer.ID=? AND users.ID=?", [id, id], (err, data) => {
                    //Check password
                    const isPwCorrect = bcrypt.compareSync(req.body.password, data[0].password);
                    if (!isPwCorrect) return res.status(400).json("Username หรือ รหัสผ่าน ไม่ถูกต้อง")
                    const token = jwt.sign({ id: data[0].ID }, "jwtkey");
                    const { password, ...other } = data[0]; // เปลี่ยนข้อมูลที่เป็นรหัสผ่านที่จะเก็บเป็นคุกกี้ให้เป็นข้อมูลอื่น/ค่าอื่น
                    res.cookie("access_token", token, {
                        httpOnly: true
                    }).status(200).json(other)
                })
            }
        })

    });
}

export const logout = (req, res) => {

    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("ออกจากระบบแล้ว")
}

export const updatePass = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid!")
        const query = "SELECT * FROM users WHERE ID = ?"
        db.query(query, [userInfo.id], (err, data) => {
            if (err) return res.json(err)
            if (data.length === 0) return res.status(404).json("ไม่พบบัญชีผู้ใช้งานนี้")

            //Check password
            const isPwCorrect = bcrypt.compareSync(req.body.old_pass, data[0].password);
            if (!isPwCorrect) return res.status(400).json("รหัสผ่านเก่าไม่ถูกต้อง")
            if (req.body.new_pass === req.body.new_pass2 && req.body.new_pass != req.body.old_pass && req.body.new_pass != "" && req.body.new_pass2 != "" && req.body.new_pass != null && req.body.new_pass2 != null) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.new_pass, salt);
                db.query("UPDATE users SET password = ? WHERE ID = ?", [hash, userInfo.id])
                return res.status(200).json("เปลี่ยนรหัสผ่านเสร็จสิ้น")
            }
            else return res.status(400).json("รหัสผ่านใหม่ไม่ตรงกัน หรือรหัสผ่านเหมือนเดิม")

        })
    })
}