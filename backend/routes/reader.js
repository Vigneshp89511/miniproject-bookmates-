import express from 'express';
import { authRequired, requireAccountType } from '../middleware/auth.js';
import User from '../models/User.js';
import Book from '../models/Book.js';

const router = express.Router();

// GET /reader/profile - return user info including favoriteGenre
router.get('/reader/profile', authRequired, requireAccountType(['reader']), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      favoriteGenre: user.favoriteGenre,
      createdAt: user.createdAt,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /reader/books?query=searchTerm
router.get('/reader/books', authRequired, requireAccountType(['reader']), async (req, res) => {
  try {
    const { query = '' } = req.query;
    const filter = { available: true };
    if (query) {
      const regex = new RegExp(query, 'i');
      filter.$or = [{ title: regex }, { author: regex }, { genre: regex }];
    }
    const books = await Book.find(filter).sort({ createdAt: -1 }).limit(200);
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;


