import { Router } from 'express';
import { register, login, getCurrentUser, logout } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireDB } from '../middleware/dbCheck.js';

const router = Router();

// POST /api/auth/register - Register a new account
router.post('/register', requireDB, register);

// POST /api/auth/login - Sign in with credentials
router.post('/login', requireDB, login);

// POST /api/auth/logout - Sign out session
router.post('/logout', logout);

// GET /api/auth/me - Get current user profile (JWT protected)
router.get('/me', requireDB, verifyToken, getCurrentUser);

export default router;
