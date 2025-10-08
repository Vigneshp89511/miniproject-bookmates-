// backend/middleware/upload.js
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload function
export const uploadToCloudinary = (fileBuffer, folder = 'book-images') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    const readable = new Readable();
    readable._read = () => {};
    readable.push(fileBuffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

export default upload;
