import express from 'express';
import { getMessages, getUsersForSideBar } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/users' , protectRoute , getUsersForSideBar)
router.get('/:id' , protectRoute , getMessages) // get messages between current user with a specific user which has this id  --> :id 

export default router;