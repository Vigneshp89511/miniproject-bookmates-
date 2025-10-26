import express from 'express';
import { authRequired, requireAccountType } from '../middleware/auth.js';
import upload from '../middleware/upload.js'; // 👈 Cloudinary + Multer middleware
 

const router = express.Router();

/* ----------------------- GET: Analytics ----------------------- */
router.get(
  '/contributor/analytics',
  authRequired,
  requireAccountType(['contributor']),
  async (req, res) => {
    try {
      const owner = req.user.id;
      const [totalListings, activeListings] = await Promise.all([
        Book.countDocuments({ owner }),
        Book.countDocuments({ owner, available: true }),
      ]);

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
  }
);

/* ----------------------- GET: Requests (placeholder) ----------------------- */
router.get(
  '/contributor/requests',
  authRequired,
  requireAccountType(['contributor']),
  async (_req, res) => {
    return res.json([]);
  }
);

/* ----------------------- GET: My Books ----------------------- */
router.get(
  '/contributor/books',
  authRequired,
  requireAccountType(['contributor']),
  async (req, res) => {
    try {
      const books = await Book.find({ owner: req.user.id }).sort({ createdAt: -1 });
      return res.json(books);
    } catch (err) {
      return res.status(500).json({ message: err.message || 'Server error' });
    }
  }
);

/* ----------------------- POST: Create New Book (with Cloudinary upload) ----------------------- */
router.post(
  '/contributor/books',
  authRequired,
  requireAccountType(['contributor']),
  upload.single('image'), // 👈 handles image field in form-data
  async (req, res) => {
    try {
      const { title, author, genre, description, available = true } = req.body;

      if (!title || !author || !genre) {
        return res.status(400).json({ message: 'title, author, and genre are required' });
      }

      const book = await Book.create({
        title,
        author,
        genre,
        description,
        available,
        imageUrl: req.file?.path || '', // 👈 store Cloudinary URL
        owner: req.user.id,
      });

      return res.status(201).json(book);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message || 'Server error' });
    }
  }
);

/* ----------------------- DELETE: Remove My Book ----------------------- */
router.delete(
  '/contributor/books/:id',
  authRequired,
  requireAccountType(['contributor']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findOneAndDelete({ _id: id, owner: req.user.id });
      if (!book) return res.status(404).json({ message: 'Book not found' });
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message || 'Server error' });
    }
  }
);

export default router;
