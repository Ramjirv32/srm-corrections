import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from 'dotenv';
import { User } from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const secret = process.env.JWT_SECRET;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.options('*', cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected Successfully to database 'SRM'");
    })
    .catch(err => {
        console.error("MongoDB Connection Error Details:", {
            message: err.message,
            stack: err.stack
        });
        process.exit(1);
    });

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (email, token) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification",
        html: `
            <h2>Thank you for registering!</h2>
            <p>Please verify your email by clicking on the link below:</p>
            <a href="${process.env.FRONTEND_URL}/login?token=${token}">Verify Email</a>
            <p>This link will expire in 24 hours.</p>
        `
    };

    return transporter.sendMail(mailOptions);
};

const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset OTP",
        html: `
            <h2>Password Reset Request</h2>
            <p>Your OTP for password reset is: <strong>${otp}</strong></p>
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `
    };
    return transporter.sendMail(mailOptions);
};

// JWT verification middleware
const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ success: false, message: "A token is required for authentication" });
    }
    
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
            return res.status(200).json({ success: true, token });
        }
        return res.status(400).json({ success: false, message: "Incorrect password" });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "An error occurred during login",
            error: error.message 
        });
    }
});

// Signin (Registration) route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(20).toString('hex');
        
        const newUser = new User({
            username: email.split('@')[0], // Generate a username from email
            email,
            password: hash,
            verified: false,
            verificationToken
        });
        
        await newUser.save();
        await sendVerificationEmail(email, verificationToken);
        
        const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
        return res.status(201).json({
            success: true,
            token,
            message: "Account created. Please check your email to verify your account."
        });
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "An error occurred during registration",
            error: error.message 
        });
    }
});

// Email verification route
app.get('/verify-email', async (req, res) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid verification token" });
        }
        
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        
        return res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during verification",
            error: error.message
        });
    }
});

// Forgot password route
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP valid for 10 minutes
        
        user.resetPasswordOTP = otp;
        user.resetPasswordExpiry = otpExpiry;
        await user.save();
        
        await sendOTPEmail(email, otp);
        
        return res.status(200).json({ 
            success: true, 
            message: "OTP sent to your email"
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing your request",
            error: error.message
        });
    }
});

// Reset password route
app.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ 
            email, 
            resetPasswordOTP: otp,
            resetPasswordExpiry: { $gt: new Date() }
        });
        
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }
        
        const hash = await bcrypt.hash(newPassword, 10);
        user.password = hash;
        user.resetPasswordOTP = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();
        
        return res.status(200).json({ 
            success: true, 
            message: "Password reset successful" 
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while resetting your password",
            error: error.message
        });
    }
});

// Protected route example
app.get('/protected', verifyJWT, (req, res) => {
    res.json({ success: true, message: "You have access to protected data", user: req.user });
});

// Collections listing route
app.get('/collections', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.json(collections.map(col => col.name));
    } catch (error) {
        res.status(500).json({ error: 'Error fetching collections' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});