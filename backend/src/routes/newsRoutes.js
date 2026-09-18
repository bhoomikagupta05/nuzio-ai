import { Router } from 'express';
import { getDailyBriefing, getDiscoverFeed, getArticleById } from '../controllers/newsController.js';
import { requireDB } from '../middleware/dbCheck.js';

const router = Router();

// News endpoints check DB availability gracefully
router.use(requireDB);

// GET /api/news/daily - Get daily brief articles
router.get('/daily', getDailyBriefing);

// GET /api/news/discover - Get discover feed with search & category filters
router.get('/discover', getDiscoverFeed);

// GET /api/news/:id - Get single article
router.get('/:id', getArticleById);

export default router;
