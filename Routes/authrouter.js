const express =require("express")
const { Loginuser, Signupuser, Logout, uploadfile } = require("../Contorller/authcontroller")
const multer = require("multer")


const router = express.Router()

const upload=multer({dest:"uploads"})

router.post("/login", Loginuser)

router.post("/signup", Signupuser)

router.post("/logout", Logout)

router.post('/upload', upload.single('file'),uploadfile )

module.exports=router