const jwt = require("jsonwebtoken");
const Usermodal = require("../Modal/Usermodal");

const protectRoute = async (req,res,next) => {
    try {
        const token = req.params.token;
        if (!token) {
            return res.status(401).json("Unauthorized - No Token Provided")
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if (!decoded) {
            return res.status(401).json("Unauthorized - Invalid token")
        }

        const user = await Usermodal.findById(decoded.userid).select("-password")
        
        req.user = user
        
        next()

    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message,
        })
    }
}


module.exports=protectRoute