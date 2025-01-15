import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Adjust this path to your frontend's public directory
const frontendPublicPath = path.join(path.resolve() , '../frontend/public');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destPath = path.join(frontendPublicPath, 'others'); // default path

    if (file.fieldname === 'profilePic') {
      destPath = path.join(frontendPublicPath, 'profiles');
    } else if (file.fieldname === 'messageImage') {
      destPath = path.join(frontendPublicPath, 'messages');
    }

    // Ensure the directory exists
    fs.mkdirSync(destPath, { recursive: true });

    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage: storage });