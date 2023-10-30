import express from "express"
import {register, login, logout, updatePass} from "../controllers/auth.js"
const router = express.Router()

router.post("/register", register)
router.put("/changepass", updatePass)
router.post("/login", login)
router.post("/logout", logout)

export default router