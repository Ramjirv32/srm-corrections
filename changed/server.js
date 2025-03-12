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

// Update the verification email function to use base64-encoded JSON data
const sendVerificationEmail = async (email, token) => {
    console.log(`Sending verification email to ${email} with token: ${token}`);
    
    // Create a JSON object with the token and email
    const verificationData = {
        token: token,
        email: email,
        timestamp: Date.now()
    };
    
    // Encode the data as base64 to make it more compact
    const encodedData = Buffer.from(JSON.stringify(verificationData)).toString('base64');
    
    // Create verification URL with encoded data
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify?data=${encodedData}`;
    console.log("Verification URL created");
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Please Verify Your Email Address",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <h2 style="color: #F5A051; text-align: center;">Thank you for registering!</h2>
                <p>Please verify your email address by clicking on the button below:</p>
                <div style="text-align: center; margin: 25px 0;">
                    <a href="${verificationUrl}" 
                       style="background-color: #F5A051; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
                       Verify Email Address
                    </a>
                </div>
                <p style="font-size: 0.8em; color: #666; text-align: center;">
                    This verification link will expire in 48 hours. If you did not create an account, please ignore this email.
                </p>
                <p>
                    If the button doesn't work, copy and paste this URL into your browser:<br>
                    <a href="${verificationUrl}">${verificationUrl}</a>
                </p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Verification email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
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
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }
        
        // Check if the user's email is verified
        if (!user.verified) {
            return res.status(200).json({ 
                success: false,
                verified: false,
                needsVerification: true,
                message: "Please verify your email before logging in" 
            });
        }

        // User is verified and password is correct - create token and log in
        const token = jwt.sign({ 
            email,
            userId: user._id,
            username: user.username
        }, secret, { expiresIn: '24h' });
        
        return res.status(200).json({ 
            success: true, 
            verified: true,
            token,
            email: user.email,
            username: user.username
        });
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
        const verificationToken = crypto.randomBytes(32).toString('hex');
        
        const newUser = new User({
            username: email.split('@')[0], // Generate a username from email
            email,
            password: hash,
            verified: false,
            verificationToken,
            verificationExpires: new Date(Date.now() + 48 * 60 * 60 * 1000) // 48 hours
        });
        
        await newUser.save();
        
        try {
            await sendVerificationEmail(email, verificationToken);
            
            return res.status(201).json({
                success: true,
                message: "Account created. Please check your email to verify your account."
            });
        } catch (emailError) {
            // If email sending fails, still create the account but inform the user
            console.error("Failed to send verification email:", emailError);
            return res.status(201).json({
                success: true,
                message: "Account created, but we couldn't send a verification email. Please contact support."
            });
        }
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "An error occurred during registration",
            error: error.message 
        });
    }
});

// Email verification endpoint (legacy format)
app.get('/verify-email', async (req, res) => {
    const { token } = req.query;
    
    console.log("Received verification request with token:", token);
    
    if (!token) {
        console.log("Verification failed: Missing token");
        return res.status(400).json({ 
            success: false, 
            message: "Verification token is missing" 
        });
    }
    
    try {
        console.log("Looking for user with token:", token);
        
        // First try to find without expiry check to see if token exists at all
        const anyUser = await User.findOne({ verificationToken: token });
        if (!anyUser) {
            console.log("No user found with this token");
            return res.status(400).json({ 
                success: false, 
                message: "Invalid verification token. The token may not exist in our system." 
            });
        }
        
        // Now check with expiry
        const user = await User.findOne({ 
            verificationToken: token,
            verificationExpires: { $gt: new Date() }
        });
        
        if (!user) {
            console.log("Token exists but may be expired");
            // Check if token is expired
            const expiredUser = await User.findOne({ 
                verificationToken: token,
                verificationExpires: { $lte: new Date() }
            });
            
            if (expiredUser) {
                console.log("Token is expired");
                return res.status(400).json({ 
                    success: false, 
                    message: "Verification token has expired. Please request a new verification email." 
                });
            }
            
            return res.status(400).json({ 
                success: false, 
                message: "Invalid or expired verification token. Please request a new verification email." 
            });
        }
        
        console.log("Valid token found, updating user verification status");
        
        // Update user verification status
        user.verified = true;
        user.verificationToken = undefined;
        user.verificationExpires = undefined;
        await user.save();
        
        console.log("User email verified successfully");
        
        return res.status(200).json({ 
            success: true, 
            message: "Email verified successfully. You can now log in." 
        });
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during verification. Please try again.",
            error: error.message
        });
    }
});

// New verification endpoint for encoded JSON data
app.post('/verify-email-token', async (req, res) => {
    const { token, email } = req.body;
    
    console.log("Received verification request with token and email:", { token, email });
    
    if (!token || !email) {
        console.log("Verification failed: Missing token or email");
        return res.status(400).json({ 
            success: false, 
            message: "Verification data is incomplete" 
        });
    }
    
    try {
        // Look for a user with both the token and matching email for added security
        const user = await User.findOne({ 
            email: email,
            verificationToken: token,
            verificationExpires: { $gt: new Date() }
        });
        
        if (!user) {
            console.log("Invalid or expired verification data");
            return res.status(400).json({ 
                success: false, 
                message: "Invalid or expired verification token. Please request a new verification email." 
            });
        }
        
        console.log("Valid token found, updating user verification status");
        
        // Update user verification status
        user.verified = true;
        user.verificationToken = undefined;
        user.verificationExpires = undefined;
        await user.save();
        
        console.log("User email verified successfully");
        
        return res.status(200).json({ 
            success: true, 
            message: "Email verified successfully. You can now log in." 
        });
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during verification. Please try again.",
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

// Resend verification email
app.post('/resend-verification', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        if (user.verified) {
            return res.status(400).json({ success: false, message: "Email already verified" });
        }
        
        // Generate a new verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        
        // Update user with new token and expiry time
        user.verificationToken = verificationToken;
        user.verificationExpires = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours
        await user.save();
        
        // Send the verification email
        await sendVerificationEmail(email, verificationToken);
        
        return res.status(200).json({ 
            success: true, 
            message: "Verification email sent. Please check your inbox." 
        });
    } catch (error) {
        console.error("Resend verification error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while sending the verification email",
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

// Debug route to check tokens
app.get('/debug/tokens', async (req, res) => {
    try {
        // Find users with verification tokens
        const users = await User.find({ verificationToken: { $exists: true } })
            .select('email verificationToken verificationExpires')
            .lean();
        
        return res.json({
            success: true,
            count: users.length,
            users: users.map(u => ({
                email: u.email,
                tokenExists: !!u.verificationToken,
                tokenLength: u.verificationToken ? u.verificationToken.length : 0,
                expires: u.verificationExpires,
                isExpired: u.verificationExpires < new Date()
            }))
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Error checking tokens", 
            error: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});