const bcryptjs = require("bcryptjs")
const { translate } = require("bing-translate-api")
const jwt=require("jsonwebtoken")

const hashedpassword = async(password) => {
    let salt = await bcryptjs.genSalt(10)
    let hash = await bcryptjs.hash(password,salt)
    return hash
}

const generatetoken =async(userid) => {
        const token = jwt.sign({ userid }, process.env.JWT_SECRET, { expiresIn: "15d" })
        return token
}

const comparepassword = async (password,hashpassword) => {
    let compare = await bcryptjs.compare(password, hashpassword)
    return compare
}

const translatechatmsg=async(translatesentence,language)=>{
    try {
        let res = await translate(translatesentence, null, language)
        return res.translation
    } catch (error) {
        console.log(error)
        throw error
    }
}


module.exports = {
    hashedpassword,
    generatetoken,
    comparepassword,
    translatechatmsg
}