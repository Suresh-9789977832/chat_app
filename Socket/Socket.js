const {Server} = require("socket.io")
const http = require("http")
const express = require("express")

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5000"],
        methods:["GET","POST"]
    }
})

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}



const getsendSocketId = (senderId) => {
    return userSocketMap[senderId]
}



const userSocketMap={}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id)

    const userId = socket.handshake.query.userId
    if ((userId) != "undefined") userSocketMap[userId] = socket.id
    
    io.emit("getonlineusers",Object.keys(userSocketMap))


    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("getonlineusers",Object.keys(userSocketMap))
    })
})


module.exports = {
    io,
    app,
    server,
    getReceiverSocketId,
    getsendSocketId,
}