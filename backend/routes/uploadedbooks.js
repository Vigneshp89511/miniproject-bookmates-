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

export default upbk;