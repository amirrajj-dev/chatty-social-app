import express from 'express';
import { updateProfile, signup, login, logout, checkAuth } from '../controllers/auth.controller.js';
import { upload } from '../utils/multerSetup.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/update-profile', upload.single('profilePic'), updateProfile);
router.get('/check-auth', checkAuth);

export default router;