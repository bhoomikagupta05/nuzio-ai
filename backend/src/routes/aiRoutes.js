import { Router } from 'express';
import { getDailyBriefing, getStorySummary } from '../controllers/aiController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireDB } from '../middleware/dbCheck.js';

const router = Router();

// AI endpoints require active DB and authenticated user
router.use(requireDB);
router.use(verifyToken);

// POST /api/ai/briefing
router.post('/briefing', getDailyBriefing);

// POST /api/ai/summarize
router.post('/summarize', getStorySummary);

export default router;
