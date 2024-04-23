const mongoose = require("mongoose")

const Userschema = new mongoose.Schema({
    fullname: {
        type: String,
         required:true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    imageurl: {
        type: String,
        required:true,
    }

},{ timestamps: true })


const Usermodal = mongoose.model("User", Userschema)

module.exports=Usermodal