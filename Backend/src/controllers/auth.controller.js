const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const { z } = require("zod")

// ── Validation Schemas ───────────────────────────────────────────────────────
const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
})

/**
 * @name registerUserController
 * @description register a new user
 */
async function registerUserController(req, res) {
    try {
        const validation = registerSchema.safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.errors[0].message
            })
        }

        const { username, email, password } = validation.data

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isUserAlreadyExists) {
            return res.status(409).json({
                message: "Account already exists with this email or username"
            })
        }

        const hash = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            username,
            email,
            password: hash
        })

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        })

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Registration error:", error)
        res.status(500).json({ message: "Internal server error during registration" })
    }
}

/**
 * @name loginUserController
 * @description login a user
 */
async function loginUserController(req, res) {
    try {
        const validation = loginSchema.safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.errors[0].message
            })
        }

        const { email, password } = validation.data

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        })

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({ message: "Internal server error during login" })
    }
}

/**
 * @name logoutUserController
 */
async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
        if (token) {
            await tokenBlacklistModel.create({ token })
        }
        res.clearCookie("token")
        res.status(200).json({ message: "User logged out successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error during logout" })
    }
}

/**
 * @name getMeController
 */
async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({
            message: "User details fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details" })
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}