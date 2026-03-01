const mongoose = require("mongoose")



async function connectToDB() {

    try {
        console.log("Connecting to MongoDB...")
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database successfully")
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectToDB