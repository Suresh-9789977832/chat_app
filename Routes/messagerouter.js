const express = require("express")
const { sendMessage, getMessages, changelanguage } = require("../Contorller/messagecontroller")
const protectRoute = require("../Middleware/ProtectRoute")

 const router = express.Router()


router.post('/send/:id/:token', protectRoute, sendMessage)

router.get('/get/:id/:token', protectRoute, getMessages)

router.post('/changelanguage/:token', protectRoute,changelanguage)




module.exports=router