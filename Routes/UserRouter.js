const express = require("express")
const protectRoute = require("../Middleware/ProtectRoute")
const { getotherusers } = require("../Contorller/usercontroller")

 const router = express.Router()

router.get('/:token',protectRoute, getotherusers),

module.exports=router