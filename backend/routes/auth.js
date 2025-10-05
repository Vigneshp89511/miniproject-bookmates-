import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

function signToken(user) {
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  const payload = { id: user._id.toString(), email: user.email, accountType: user.accountType };
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

// POST /signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, accountType, favoriteGenre } = req.body;
    if (!name || !email || !password || !accountType) {
      return res.status(400).json({ message: 'Missing required fields: name, email, password, accountType' });
    }
    const validTypes = ['reader', 'contributor', 'both'];
    if (!validTypes.includes(accountType)) {
      return res.status(400).json({ message: 'Invalid accountType. Use reader | contributor | both' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password, accountType, favoriteGenre });
    const token = signToken(user);
    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, accountType: user.accountType, favoriteGenre: user.favoriteGenre },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Signup error:', err);
    const msg = err?.errors?.accountType?.message || err?.message || 'Server error';
    return res.status(500).json({ message: msg });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken(user);
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, accountType: user.accountType, favoriteGenre: user.favoriteGenre },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Login error:', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
});

export default router;


