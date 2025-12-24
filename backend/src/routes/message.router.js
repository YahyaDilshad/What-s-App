import express from 'express';
import protectRoute  from '../middleware/auth.middleware.js';
import { getUserforSlidebar, getmessage, sendmessage } from '../controllers/message.controllers.js';

const router = express.Router();

// 👇 Routes
router.get('/users', protectRoute, getUserforSlidebar);
router.get('/:id', protectRoute, getmessage);
router.post('/:id', protectRoute, sendmessage);

export default router;
