const mongoose = require("mongoose")

const connectToMongodb = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        console.log("Connected to Mongod")
    } catch (error) {
        console.log("Error conntecting to MongoDB",error.message)
    }
}

module.exports = connectToMongodb
