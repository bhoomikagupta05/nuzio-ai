import { Router } from 'express';
import { getProfile, updateProfile, toggleBookmark } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireDB } from '../middleware/dbCheck.js';

const router = Router();

// All user routes require active DB and valid JWT
router.use(requireDB);
router.use(verifyToken);

// GET /api/users/me - Retrieve current user profile
router.get('/me', getProfile);

// PATCH /api/users/me - Update user preferences
router.patch('/me', updateProfile);

// POST /api/users/me/bookmarks - Toggle bookmark
router.post('/me/bookmarks', toggleBookmark);

export default router;
