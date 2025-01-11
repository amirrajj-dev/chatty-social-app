import express from 'express';
import { getUsersForSideBar } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/users' , protectRoute , getUsersForSideBar)

export default router;