const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())

// Robust CORS mirroring for serverless/development
app.use(cors({
    origin: (origin, callback) => {
        // Echo back any origin that makes the request
        // This handles localhost and multiple Vercel domains seamlessly
        callback(null, origin || true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "X-CSRF-Token", "Accept-Version", "Content-Length", "Content-MD5", "Date", "X-Api-Version"]
}));

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app