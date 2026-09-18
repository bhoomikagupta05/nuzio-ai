import { v4 as uuidv4 } from 'uuid';
import NewsApiAiProvider from './newsApiAiProvider.js';
import Article from '../../models/Article.js';
import logger from '../../utils/logger.js';

// Simple in-memory cache to prevent API spam
const cache = {
  latest: { data: null, timestamp: 0 },
  searches: new Map() // query -> { data, timestamp }
};
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Maps raw NewsAPI.ai (Event Registry) format to our normalized Article schema
 */
const normalizeArticle = (rawArticle) => {
  return {
    id: rawArticle.uri || `story-${uuidv4()}`,
    title: rawArticle.title || 'Untitled',
    summary: rawArticle.body ? rawArticle.body.substring(0, 300) + '...' : rawArticle.title,
    content: rawArticle.body || rawArticle.title,
    category: rawArticle._nuzioCategory || 'General',
    source: {
      name: rawArticle.source?.title || 'Unknown Source',
      url: rawArticle.url || '',
      publishedAt: rawArticle.dateTimePub || rawArticle.date || new Date().toISOString(),
    },
    imageUrl: rawArticle.image || '', 
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
  const cacheKey = categories.sort().join(',');
  const now = Date.now();
  
  // Check memory cache first
  if (cache.latest.data && (now - cache.latest.timestamp < CACHE_TTL_MS) && cache.latest.key === cacheKey) {
    logger.info(`[NEWSAPI_AI] Cache status: HIT for latest news (${cacheKey})`);
    return cache.latest.data;
  }

  logger.info(`[NEWSAPI_AI] Cache status: MISS. Fetching from Provider.`);
  const rawArticles = await NewsApiAiProvider.fetchLatestNews(categories);
  const normalizedArticles = rawArticles.map(normalizeArticle);
  
  logger.info(`[NEWSAPI_AI] Normalization complete. Stories normalized: ${normalizedArticles.length}`);

  // Cache them in MongoDB for stability/fallback
  for (const article of normalizedArticles) {
    try {
      await Article.findOneAndUpdate(
        { 'source.url': article.source.url },
        { $setOnInsert: article },
        { upsert: true, new: true }
      );
    } catch (err) {
      // Ignored if duplicate key error
    }
  }

  // Update memory cache
  if (normalizedArticles.length > 0) {
    cache.latest = {
      key: cacheKey,
      data: normalizedArticles,
      timestamp: now
    };
  }

  return normalizedArticles;
};

/**
 * Search news, normalize, and cache in DB.
 */
export const fetchAndNormalizeSearchNews = async (query) => {
  const now = Date.now();
  const cachedSearch = cache.searches.get(query);
  
  if (cachedSearch && (now - cachedSearch.timestamp < CACHE_TTL_MS)) {
    logger.info(`[NEWSAPI_AI] Cache status: HIT for search query: ${query}`);
    return cachedSearch.data;
  }

  logger.info(`[NEWSAPI_AI] Cache status: MISS for search query: ${query}`);
  const rawArticles = await NewsApiAiProvider.searchNews(query);
  const normalizedArticles = rawArticles.map(normalizeArticle);
  
  logger.info(`[NEWSAPI_AI] Normalization complete. Stories normalized: ${normalizedArticles.length}`);

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

  if (normalizedArticles.length > 0) {
    cache.searches.set(query, {
      data: normalizedArticles,
      timestamp: now
    });
  }

  return normalizedArticles;
};

export default {
  fetchAndNormalizeLatestNews,
  fetchAndNormalizeSearchNews
};
