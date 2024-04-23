const Usermodal = require("../Modal/Usermodal")

const getotherusers = async(req,res) => {
    try {
        let loginid = req.user._id
        let filteruser = await Usermodal.find({ _id: { $ne: loginid } }).select('-password')
        return res.status(200).json(filteruser)
      
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
       })
    }
}

module.exports = {
    getotherusers
}