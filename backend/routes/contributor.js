import express from 'express';
import { authRequired, requireAccountType } from '../middleware/auth.js';
import Book from '../models/Book.js';

const router = express.Router();

// GET /contributor/analytics - simple stats computed from books
router.get('/contributor/analytics', authRequired, requireAccountType(['contributor']), async (req, res) => {
  try {
    const owner = req.user.id;
    const [totalListings, activeListings] = await Promise.all([
      Book.countDocuments({ owner }),
      Book.countDocuments({ owner, available: true }),
    ]);
    // Placeholder zeros for fields not modeled yet
    const analytics = {
      totalListings,
      activeListings,
      completedExchanges: 0,
      totalViews: 0,
      totalRequests: 0,
      averageRating: 0,
      earnings: 0,
    };
    return res.json(analytics);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
});

// GET /contributor/requests - placeholder empty list (no request model yet)
router.get('/contributor/requests', authRequired, requireAccountType(['contributor']), async (_req, res) => {
  return res.json([]);
});

// GET /contributor/books - list my books
router.get('/contributor/books', authRequired, requireAccountType(['contributor']), async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id }).sort({ createdAt: -1 });
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
});

// POST /contributor/books - create new book
router.post('/contributor/books', authRequired, requireAccountType(['contributor']), async (req, res) => {
  try {
    const { title, author, genre, description, available = true } = req.body;
    if (!title || !author || !genre) {
      return res.status(400).json({ message: 'title, author, genre are required' });
    }
    const book = await Book.create({ title, author, genre, description, available, owner: req.user.id });
    return res.status(201).json(book);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
});

// DELETE /contributor/books/:id - delete my book
router.delete('/contributor/books/:id', authRequired, requireAccountType(['contributor']), async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndDelete({ _id: id, owner: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
});

export default router;


