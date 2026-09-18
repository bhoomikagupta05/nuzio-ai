import { v4 as uuidv4 } from 'uuid';
import NewsAPIProvider from './NewsAPIProvider.js';
import Article from '../../models/Article.js';
import logger from '../../utils/logger.js';

/**
 * Maps raw NewsAPI format to our normalized Article schema
 */
const normalizeArticle = (rawArticle) => {
  return {
    id: `story-${uuidv4()}`,
    title: rawArticle.title || 'Untitled',
    summary: rawArticle.description || rawArticle.title,
    content: rawArticle.content || rawArticle.description,
    category: rawArticle._nuzioCategory || 'General',
    source: {
      name: rawArticle.source?.name || 'Unknown Source',
      url: rawArticle.url || '',
      publishedAt: rawArticle.publishedAt || new Date().toISOString(),
    },
    // We store imageUrl in a top-level field for the UI, though it's not strictly in the mongoose schema
    imageUrl: rawArticle.urlToImage || '', 
    readTime: '2 min read',
    audioDuration: '1:45',
    isFeatured: false,
    tags: [(rawArticle._nuzioCategory || 'General').toUpperCase()],
  };
};

/**
 * Fetch latest news, normalize, and cache in DB.
 */
export const fetchAndNormalizeLatestNews = async (categories = []) => {
  logger.info(`[NEWS] Provider: NewsAPI`);
  
  const rawArticles = await NewsAPIProvider.fetchLatestNews(categories);
  const normalizedArticles = rawArticles.map(normalizeArticle);
  
  logger.info(`[NEWS] Stories normalized: ${normalizedArticles.length}`);

  // Cache them in MongoDB for stability/rate-limit avoidance
  for (const article of normalizedArticles) {
    try {
      // Upsert by URL to avoid duplicating the exact same story
      await Article.findOneAndUpdate(
        { 'source.url': article.source.url },
        { $setOnInsert: article },
        { upsert: true, new: true }
      );
    } catch (err) {
      // Ignored if duplicate key error during race
    }
  }

  return normalizedArticles;
};

/**
 * Search news, normalize, and cache in DB.
 */
export const fetchAndNormalizeSearchNews = async (query) => {
  logger.info(`[NEWS] Provider: NewsAPI`);
  
  const rawArticles = await NewsAPIProvider.searchNews(query);
  const normalizedArticles = rawArticles.map(normalizeArticle);
  
  logger.info(`[NEWS] Stories normalized: ${normalizedArticles.length}`);

  for (const article of normalizedArticles) {
    try {
      await Article.findOneAndUpdate(
        { 'source.url': article.source.url },
        { $setOnInsert: article },
        { upsert: true, new: true }
      );
    } catch (err) {
      // Ignore
    }
  }

  return normalizedArticles;
};

export default {
  fetchAndNormalizeLatestNews,
  fetchAndNormalizeSearchNews
};
