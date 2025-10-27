import express from 'express';
import { getUserProfile } from '../controllers/userData.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/me', verifyToken, getUserProfile);
export default router;
