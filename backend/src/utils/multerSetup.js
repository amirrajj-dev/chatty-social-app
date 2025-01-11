import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destPath = 'public/others'; // default path

    // Modify the path based on your requirements
    if (file.fieldname === 'profilePic') {
      destPath = 'public/profiles';
    } else if (file.fieldname === 'messageImage') {
      destPath = 'public/messages';
    }

    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage: storage });