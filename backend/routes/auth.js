 import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {sendOtpEmail} from './mail.js';
import dotenv  from 'dotenv';

dotenv.config();

const router = express.Router();

function signToken(user) {
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  const payload = { 
    id: user._id.toString(), 
    email: user.email, 
    accountType: user.accountType 
  };
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

const senderEmail = process.env.BUILD === "development" 
  ? '"BookMates" <database189511@gmail.com>'  // Gmail for dev
  : '"BookMates" <9aa541001@smtp-brevo.com>'; 

// POST /signup
 router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, favoriteGenre } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields: name, email, password" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Generated OTP for ${email}: ${otp}`);

    // Send OTP Email
    await sendOtpEmail({ to: email, name, otp });

    // Save user with OTP (expires in 5 min)
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password,
      favoriteGenre,
      getotp: otp,
      otpExpiry,
      isVerified: false,
    });

    console.log("✅ User created with OTP:", otp);

    return res.status(201).json({
      message: "OTP sent to your email",
      email: user.email,
      requiresVerification: true,
    });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// POST /verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log('Verification attempt - Email:', email, 'OTP:', otp);

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP required' });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found - Stored OTP:', user.getotp, 'Provided OTP:', otp);
    console.log('OTP types - Stored:', typeof user.getotp, 'Provided:', typeof otp);

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified' });
    }

    // Check if OTP has expired
    if (user.otpExpiry && new Date() > user.otpExpiry) {
      console.log('OTP expired for user:', email);
      return res.status(401).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Verify OTP - convert both to string and trim whitespace
    const storedOtp = String(user.getotp).trim();
    const providedOtp = String(otp).trim();

    console.log('Comparing - Stored:', storedOtp, 'vs Provided:', providedOtp);

    if (storedOtp !== providedOtp) {
      console.log('OTP mismatch!');
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    console.log('OTP matched! Verifying user...');

    // Clear OTP and mark as verified
    user.getotp = null;
    user.otpExpiry = null;
    user.isVerified = true;
    await user.save();

    console.log('User verified successfully');

    // Now send the token
    const token = signToken(user);
    
    return res.json({
      success: true,
      message: 'Email verified successfully',
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        accountType: user.accountType, 
        favoriteGenre: user.favoriteGenre 
      },
    });
  } catch (err) {
    console.error('OTP verification error:', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
});

// POST /resend-otp
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email required' });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified' });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    console.log('Resent OTP for', email, ':', otp);

    // Send OTP email
    try {
      await transporter.sendMail({
        from: senderEmail,
        to: email,
        subject: "Your New BookMates OTP Code",
        text: `Hello ${user.name},\n\nYour new BookMates OTP is: ${otp}\n\nThis code will expire in 5 minutes.\n\n- Vignesh P and Shakthi Vel, Founders of BookMates`
      });
      console.log('Resend OTP email sent successfully');
    } catch (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }

    // Update OTP using 'getotp' field
    user.getotp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    console.log('OTP updated in database:', user.getotp);

    return res.json({
      success: true,
      message: 'New OTP sent to your email'
    });

  } catch (err) {
    console.error('Resend OTP error:', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
});

// POST /login
 router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔒 Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // 🔍 Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log(`❌ Login failed: No user found for ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 🛑 Check if verified
    if (!user.isVerified) {
      console.log(`⚠️ Unverified user tried to login: ${email}`);
      return res.status(403).json({
        message: 'Please verify your email first',
        requiresVerification: true,
        email: user.email,
      });
    }

    // 🔐 Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`❌ Incorrect password for ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Generate JWT token
    const token = signToken(user);

    // ✅ Optional: Set token in HTTP-only cookie (safer alternative)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.BUILD === 'production', // true on Render
      sameSite: process.env.BUILD === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log(`✅ User logged in: ${email}`);

    // ✅ Respond with user data + token (frontend stores it in localStorage)
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        accountType: user.accountType,
        favoriteGenre: user.favoriteGenre,
      },
    });
  } catch (err) {
    console.error('💥 Login error:', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
});


export default router;