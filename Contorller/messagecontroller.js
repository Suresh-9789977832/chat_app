const { translatechatmsg } = require("../Helper/Helper")
const Conversationmodal = require("../Modal/Conversationmodal")
const Messagemodal = require("../Modal/Messagemodal")
const { getReceiverSocketId, io, getsendSocketId} = require("../Socket/Socket")

const sendMessage = async(req,res) => {
    try {
        const { message } = req.body
        const {id:receivedId} = req.params
        const senderId = req.user._id
        
        let conversation = await Conversationmodal.findOne({
            participants:{$all:[senderId,receivedId]}
        })

        if (!conversation) {
            conversation = await Conversationmodal.create({
              participants:[senderId,receivedId]  
            })
        }

        const newMessage = new Messagemodal({
            senderId,
            receivedId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        
        await Promise.all([conversation.save(), newMessage.save()])
        
        const receiver = getReceiverSocketId(receivedId)
        if (receiver) {
            io.to(receiver).emit("newMessage",newMessage)
        }

        const sender = getsendSocketId(senderId)
        if (sender) {
            io.to(sender).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)    

    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
       })
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: otherid } = req.params
        const senderId = req.user._id
        
        const conversation = await Conversationmodal.findOne({
            participants:{$all:[senderId,otherid]}
        }).populate("messages")

        if (!conversation) return res.status(200).json([])
        
        const messages = conversation.messages


        
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
       })
    }
}
const changelanguage = async(req,res) => {
    try {
        let { messages, language } = req.body
        let userid= req.user._id

        const changechatlang = messages.map(async (msg) => {
            const translatemessage = msg.senderId != userid ?
                await translatechatmsg(msg.message, language) : msg.message
            return {
                message: translatemessage
            }
            
        })
        const translatedmessage = await Promise.all(changechatlang)

           
        if (translatedmessage.length === messages.length) {
            for (let i = 0; i < messages.length; i++){
                messages[i].message= translatedmessage[i].message
            }
        }
        res.json(messages)

     
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message,
       })
    }
}

module.exports = {
    sendMessage,
    getMessages,
    changelanguage
}

