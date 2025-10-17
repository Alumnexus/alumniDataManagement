import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,       // Correct key is 'cloud_name'
  api_key: process.env.CLOUD_API_KEY,      // Correct key is 'api_key'
  api_secret: process.env.CLOUD_API_SECRET, // Correct key is 'api_secret'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    //folder: 'event_files',
    folder: 'ALumni Data',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
  },
});

export {
  cloudinary,
  storage
};