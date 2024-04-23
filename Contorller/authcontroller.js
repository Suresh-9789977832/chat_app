const Usermodal = require("../Modal/Usermodal")
const { hashedpassword, comparepassword, generatetoken } = require("../Helper/Helper")
const extpath = require("path")
const fs=require("fs")

const Signupuser  = async(req,res) => {
    try {
        let { username, password, fullname, confirmpassword } = req.body.data
        let imageurl=req.body.imageurl

        if (!username || !password || !fullname ||!confirmpassword || !imageurl) {
            return res.status(400).send({
                message: "please fill all the field"
            })
        }
        
        if (password !== confirmpassword) {
            return res.status(400).send({
                message: "Password don't match"
            })
        }

        const user = await Usermodal.findOne({ username })
        
        if (user) {
            return res.status(400).send({
                message: `${user.username} is already exists`
            })
        }

        password = await hashedpassword(password)
        
        let finaldata = await Usermodal.create({ fullname, username, password, imageurl })
        res.status(201).send({
            message: "User created",
            finaldata,
        })

    } catch (error) {
        console.log(error)
    }
}

const Loginuser = async (req, res) => {
    try {
        let { username, password } = req.body

        if (!username || !password) {
            return res.status(400).send({
                message:"Fill all the field"
            })
        }
        

        const user = await Usermodal.findOne({ username })

        if (!user) {
            res.status(400).send({
                message:"Invalid username"
            })
        }
        else {
            if (!await comparepassword(password, user.password)) {
                res.status(400).send({
                    message:"Incorrect password"
                })
            } else {
               let token = await generatetoken(user._id)
                res.status(200).json({
                    username: user.username,
                    fullname: user.fullname,
                    imageurl: user.imageurl,
                    id: user._id,
                    token:token
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
       })
    }
}

const Logout  = async(req,res) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 })
        res.status(200).json({message:"Logged out Successfully"})
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
       })
    }
}


const uploadfile = async (req, res) => {
    try {
        const { path, originalname } = req.file
            const ext = extpath.extname(originalname)
            const newpath = path + ext
            fs.renameSync(path, newpath)
        res.json(newpath)
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        })
   
    }
}





module.exports = {
    Loginuser,
    Signupuser,
    Logout,
    uploadfile
}