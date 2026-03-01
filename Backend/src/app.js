const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
// Allow multiple origins and handle trailing slashes
const allowedOrigins = [
    "https://ai-interview-urx5.vercel.app",
    "http://localhost:5173"
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps)
        if (!origin) return callback(null, true);

        // Remove trailing slash from both for comparison
        const normalizedOrigin = origin.replace(/\/$/, "");
        const isAllowed = allowedOrigins.some(allowed =>
            allowed.replace(/\/$/, "") === normalizedOrigin
        );

        if (isAllowed) {
            callback(null, true);
        } else {
            // Echo back the origin anyway but log it, 
            // Vercel preflight often expects the origin to be exactly what it sent
            callback(null, true);
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Add a specific middleware for manual preflight to be 100% sure Vercel sees the headers
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.some(ao => ao.replace(/\/$/, "") === origin.replace(/\/$/, ""))) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app