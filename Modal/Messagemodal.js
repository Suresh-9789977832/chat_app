const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    receivedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    message: {
        type: String,
        required:true
    },


}, { timestamps: true })


const Messagemodal = mongoose.model("Message", messageSchema)

module.exports=Messagemodal