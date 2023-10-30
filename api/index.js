import express from "express"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cookieParser from "cookie-parser"
import multer from "multer"
import jwt from "jsonwebtoken"
const app = express()
app.use(express.json())
app.use(cookieParser())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename)
})

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/slips')
    },
    filename: function (req, file, cb) {
        const token = req.cookies.access_token
        if (!token) return res.status(401).json("Not authenticated!")
        jwt.verify(token, "jwtkey", (err, userInfo) => {
            cb(null, userInfo.id + "_" + file.originalname)
        })
    }
})
const uploadslip = multer({ storage: storage2 })

app.post('/api/upload/slip', uploadslip.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename)
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(8080, () => {
    console.log("Connected!")
})
