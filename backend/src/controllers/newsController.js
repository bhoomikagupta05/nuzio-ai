import Article from '../models/Article.js';
import { fetchAndNormalizeLatestNews, fetchAndNormalizeSearchNews } from '../services/news/index.js';
import { successResponse, errorResponse } from '../utils/response.js';
import logger from '../utils/logger.js';

/**
 * Get daily briefing articles
 * GET /api/news/daily
 */
export const getDailyBriefing = async (req, res) => {
  try {
    logger.info(`[NEWS] Request received for daily briefing`);
    
    // Attempt to fetch fresh news first
    let articles = [];
    try {
      articles = await fetchAndNormalizeLatestNews(['technology', 'business']);
    } catch (err) {
      logger.warn(`[NEWS] Failed to fetch live news, falling back to database: ${err.message}`);
    }

    // If live fetch fails or returns 0, fallback to what's in DB
    if (articles.length === 0) {
      articles = await Article.find().sort({ createdAt: -1 }).limit(10);
    }
    
    // Sort and limit again just in case
    articles = articles.slice(0, 10);
    
    logger.info(`[NEWS] Returning ${articles.length} stories`);
    return successResponse(res, { articles }, 'Daily briefing retrieved');
  } catch (error) {
    logger.error(`[NEWS] ERROR: ${error.message || 'Failed to retrieve daily briefing'}`);
    return errorResponse(res, error.message || 'Failed to retrieve daily briefing', 500);
  }
};

/**
 * Get discover feed with filtering
 * GET /api/news/discover
 */
export const getDiscoverFeed = async (req, res) => {
  try {
    logger.info(`[NEWS] Request received for discover feed`);
    const { category, search } = req.query;
    
    let articles = [];
    
    try {
      if (search && search.trim()) {
        articles = await fetchAndNormalizeSearchNews(search.trim());
      } else if (category && category !== 'All' && category !== 'all') {
        articles = await fetchAndNormalizeLatestNews([category]);
      } else {
        articles = await fetchAndNormalizeLatestNews(['technology', 'business', 'general']);
      }
    } catch (err) {
      logger.warn(`[NEWS] Failed to fetch live news, falling back to database: ${err.message}`);
    }

    if (articles.length === 0) {
      // Fallback DB filter
      const filter = {};
      if (category && category !== 'All' && category !== 'all') {
        filter.category = new RegExp(`^${category}$`, 'i');
      }
      if (search && search.trim()) {
        const searchRegex = new RegExp(search.trim(), 'i');
        filter.$or = [
          { title: searchRegex },
          { summary: searchRegex },
          { tags: searchRegex },
          { category: searchRegex },
        ];
      }
      articles = await Article.find(filter).sort({ createdAt: -1 }).limit(20);
    }

    logger.info(`[NEWS] Returning ${articles.length} stories`);
    return successResponse(res, { articles, total: articles.length }, 'Discover feed retrieved');
  } catch (error) {
    logger.error(`[NEWS] ERROR: ${error.message || 'Failed to retrieve discover feed'}`);
    return errorResponse(res, error.message || 'Failed to retrieve discover feed', 500);
  }
};

/**
 * Get single article by ID
 * GET /api/news/:id
 */
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findOne({ id });
    if (!article) {
      return errorResponse(res, 'Article not found', 404);
    }
    return successResponse(res, { article }, 'Article retrieved');
  } catch (error) {
    logger.error('Get article error:', error);
    return errorResponse(res, error.message || 'Failed to retrieve article', 500);
  }
};

export default {
  getDailyBriefing,
  getDiscoverFeed,
  getArticleById,
};
