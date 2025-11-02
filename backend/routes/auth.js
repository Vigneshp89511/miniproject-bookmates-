 import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import transporter from './mail.js';

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

// POST /signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, favoriteGenre } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, email, password' 
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP for', email, ':', otp);

    // Send OTP email
    try {
      await transporter.sendMail({
        from: '"BookMates" <database189511@gmail.com>',
        to: email,
        subject: "Your BookMates OTP Code",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your OTP Code</title>
            <style>
                body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
                img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
                body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; background-color: #f6f9fc; }
                .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; }
                .header { padding: 25px 40px; text-align: center; background-color: #4a6ee0; color: white; }
                .content { padding: 30px 40px; color: #333333; line-height: 1.6; }
                .otp-box { background-color: #f1f4ff; border: 2px dashed #4a6ee0; border-radius: 8px; text-align: center; padding: 20px; margin: 20px 0; }
                .otp-code { font-size: 32px; font-weight: bold; color: #4a6ee0; letter-spacing: 5px; }
                .footer { padding: 20px 40px; background-color: #f6f9fc; color: #888888; font-size: 12px; text-align: center; }
                .signature { margin-top: 30px; color: #333; text-align: left; }
                .signature h3 { margin-bottom: 5px; color: #4a6ee0; }
                @media only screen and (max-width: 480px) {
                    .container { width: 100% !important; }
                    .header, .content, .footer { padding-left: 20px !important; padding-right: 20px !important; }
                    .otp-code { font-size: 26px !important; }
                }
            </style>
        </head>
        <body>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f6f9fc">
                <tr>
                    <td align="center">
                        <table role="presentation" class="container" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td class="header">
                                    <h1>BookMates Verification</h1>
                                </td>
                            </tr>
                            <tr>
                                <td class="content">
                                    <h2>Your One-Time Password (OTP)</h2>
                                    <p>Hello ${name},</p>
                                    <p>To verify your identity and continue securely with BookMates, please use the following One-Time Password (OTP):</p>
                                    <div class="otp-box">
                                        <div class="otp-code">${otp}</div>
                                    </div>
                                    <p>This code will expire in <strong>5 minutes</strong>. Please do not share it with anyone.</p>
                                    <p>If you didn't request this OTP, please ignore this email or contact our support team immediately.</p>
                                    <div class="signature">
                                        <p>Warm regards,</p>
                                        <h3>Vignesh P and Shakthi Vel</h3>
                                        <p>Founders of <strong>BookMates</strong></p>
                                        <p><a href="mailto:founder@bookmates.com">founder@bookmates.com</a></p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="footer">
                                    <p>You're receiving this email because you or someone used your email address for verification at BookMates.</p>
                                    <p>&copy; ${new Date().getFullYear()} BookMates. All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `,
        text: `Hello ${name},\n\nYour BookMates OTP is: ${otp}\n\nThis code will expire in 5 minutes.\n\n- Vignesh P and Shakthi Vel, Founders of BookMates`
      });
      console.log('OTP email sent successfully');
    } catch (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ 
        message: 'Failed to send OTP email. Please try again.' 
      });
    }

    // Store OTP with expiration time (5 minutes)
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    
    // IMPORTANT: Store with field name 'getotp' to match your User model
    const user = await User.create({ 
      name, 
      email, 
      password, 
      favoriteGenre,
      getotp: otp,  // Using 'getotp' to match your original schema
      otpExpiry: otpExpiry,
      isVerified: false
    });

    console.log('User created with OTP:', user.getotp);

    // Don't send token yet - user needs to verify OTP first
    return res.status(201).json({
      message: 'OTP sent to your email',
      email: user.email,
      requiresVerification: true
    });

  } catch (err) {
    console.error('Signup error:', err);
    const msg = err?.errors?.accountType?.message || err?.message || 'Server error';
    return res.status(500).json({ message: msg });
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
        from: '"BookMates" <database189511@gmail.com>',
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
      secure: process.env.NODE_ENV === 'production', // true on Render
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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