const mongoose = require("mongoose")

let isConnected = false;

async function connectToDB() {
    if (isConnected) {
        console.log("Using existing database connection")
        return;
    }

    try {
        console.log("Connecting to MongoDB...")
        const db = await mongoose.connect(process.env.MONGO_URI)
        isConnected = db.connections[0].readyState;
        console.log("Connected to Database successfully")
    }
    catch (err) {
        console.log("Database connection error:", err)
        if (process.env.NODE_ENV !== "production") {
            process.exit(1)
        }
    }
}

module.exports = connectToDB