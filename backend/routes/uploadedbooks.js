import express from "express";
import multer from 'multer'
import UpBooks from "../models/uploadedBooks.js";
 
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_change_me');

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // <- this is key! now req.user._id exists
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};


const upbk = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add book
upbk.post(
  "/contributer/books",
  authMiddleware,
  upload.single("coverImage"),
  async (req, res) => {
    console.log(req.user);
    try {
      const photo = req.file ? req.file.buffer.toString("base64") : null;
      const {
        title,
        author,
        genre,
        condition,
        exchangeType,
        exchangeDuration,
        price,
        description,
        getotp,
        termsAccepted,
      } = req.body;

      if (!title || !author || !genre || !condition || !exchangeType || !termsAccepted) {
        return res.status(400).json({ message: "Please fill all required fields." });
      }

      const newBook = new UpBooks({
        title,
        author,
        genre,
        condition,
        exchangeType,
        exchangeDuration: exchangeDuration || null,
        price: price || null,
        description: description || "",
        coverImage: photo,
        getotp,
        termsAccepted,
        owner:req.user._id // from auth middleware
      });

      const savedBook = await newBook.save();
      console.log('succes')
      res.status(201).json(savedBook);
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ message: "Server error while creating book." });
    }
  }
);

upbk.get('/contributer/books',async (req,res)=>{
    try {
        const response = await UpBooks.find();
        res.status(200).json({response});
    } catch (error) {
        console.log("error",error)
    }
})

upbk.delete(
  '/contributer/books/:id',
  authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      // Find and delete only if user owns the book
      const book = await UpBooks.findOneAndDelete({ _id: id });
      console.log('Book deleted:', book);
      if (!book) {
        return res.status(404).json({ message: 'Book not found or unauthorized' });
      }
      console.log('Book deleted:');
      return res.json({ success: true, message: 'Book deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message || 'Failed to delete book' });
    }
  }
);

upbk.put(
  "/contributer/books/:id",
  authMiddleware,
  upload.single("coverImage"),
  async (req, res) => {
    try {
      const { id } = req.params;
      
      // Find the book first
      const book = await UpBooks.findById(id);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      // Check ownership
      if (book.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Unauthorized to edit this book" });
      }
      
      // Prepare update data
      const {
        title,
        author,
        genre,
        condition,
        exchangeType,
        exchangeDuration,
        price,
        description,
        termsAccepted,
      } = req.body;
      
      // Build update object
      const updateData = {
        title,
        author,
        genre,
        condition,
        exchangeType,
        exchangeDuration: exchangeDuration || null,
        price: price || null,
        description: description || "",
        termsAccepted,
      };
      
      // If new cover image is uploaded, add it
      if (req.file) {
        updateData.coverImage = req.file.buffer.toString("base64");
      }
      
      // Update the book
      const updatedBook = await UpBooks.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      console.log('Book updated successfully:', updatedBook.title);
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error("Error updating book:", error);
      res.status(500).json({ message: "Server error while updating book." });
    }
  }
);


export default upbk;

