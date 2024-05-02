const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const path=require("path")
const cookie_parser=require("cookie-parser")
const authrouter=require("./Routes/authrouter")
const messagerouter = require("./Routes/messagerouter")
const userRouter=require("./Routes/UserRouter")
const connectToMongodb = require("./Db/ConnectMongodb")
const cors = require("cors")
const { app, server } = require("./Socket/Socket")

const PORT = process.env.PORT || 6000

const __dirname=path.resolve()

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.json())
app.use(cookie_parser())
app.use( cors({
    origin: "http://localhost:5173",
    credentials:true
}))


app.use('/api/auth', authrouter)
app.use('/api/message', messagerouter)
app.use('/api/users',userRouter)
app.use(express.static(path.join(__dirname,"/frontend/dist")))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})


server.listen(PORT, () => {
    connectToMongodb(),
    console.log(`server running on ${PORT}`)
})

