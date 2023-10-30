import express from "express"
import { addPost, deletePost, getPost, getPosts, getOthers,updateTopUp, getTransaction,getWallet,updateWalletSell, updateTransaction ,updateWallet, getCarts, removeCart,addChatHistory, addTransaction, addCart, updatePost } from "../controllers/post.js"

const router = express.Router()
router.get("/", getPosts)
router.get("/wallet/user/:status", getWallet)
router.get("/:id", getPost)
router.get("/cart/user", getCarts)
router.get("/transaction/user", getTransaction)
router.get("/other/:gamename/:id", getOthers)
router.post("/transaction", addTransaction)
router.post("/cart", addCart)
router.post("/chat/seller/buyer/addChatHistory", addChatHistory)
router.post("/", addPost)
router.delete("/:id/:pid", deletePost)
router.delete("/cart/remove/:id", removeCart)
router.put("/transaction/update/:id", updateTransaction)
router.put("/money/update/seller", updateWalletSell)
router.put("/money/update/:id", updateWallet)
router.put("/money/update/topup/admin", updateTopUp)
router.put("/:id", updatePost)

export default router