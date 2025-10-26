import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer'
import authRoutes from './routes/auth.js';
import readerRoutes from './routes/reader.js';
import contributorRoutes from './routes/contributor.js';
import upbk from "./routes/uploadedbooks.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', authRoutes);
app.use('/api', readerRoutes);
app.use('/api', contributorRoutes);
app.use('/api', upbk);

const MONGODB_URI = process.env.MONGODB_URL;
const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGODB_URI, {
    dbName: process.env.MONGODB_DB || undefined,
  })
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

export default app;


