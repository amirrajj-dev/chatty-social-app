import express from 'express';
import { getMessages, sendMessage , getUsersForSideBar } from '../controllers/message.controller.js';
import { upload } from '../utils/multerSetup.js';
import {protectRoute} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.use(protectRoute)

router.get('/users' , getUsersForSideBar)
router.get('/:id/messages', getMessages);
router.post('/send-message/:id', upload.single('messageImage'), sendMessage);

export default router;