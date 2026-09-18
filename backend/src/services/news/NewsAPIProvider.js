import axios from 'axios';
import config from '../../config/env.js';
import logger from '../../utils/logger.js';

export class NewsAPIProvider {
  constructor() {
    this.apiKey = config.newsApiKey;
    this.baseUrl = 'https://newsapi.org/v2';
    
    // Fallback categories if none requested
    this.defaultCategories = ['technology', 'business'];
  }

  /**
   * Fetch top headlines for given categories
   */
  async fetchLatestNews(categories = []) {
    if (!this.apiKey) {
      throw new Error('NEWS_API_KEY is missing');
    }

    try {
      const catsToFetch = categories.length > 0 ? categories : this.defaultCategories;
      let allArticles = [];

      // We limit to max 2 requests to avoid hitting rate limits too quickly on the free tier
      const limitedCats = catsToFetch.slice(0, 2);

      for (const category of limitedCats) {
        logger.info(`[NEWS] Fetching latest stories for category: ${category}`);
        const response = await axios.get(`${this.baseUrl}/top-headlines`, {
          params: {
            country: 'us', // Or 'in' for India depending on preference
            category: category.toLowerCase(),
            pageSize: 10,
            apiKey: this.apiKey,
          },
        });

        if (response.data.status === 'ok') {
          // Tag articles with the category so we can normalize them later
          const articles = response.data.articles.map((a) => ({
            ...a,
            _nuzioCategory: category,
          }));
          allArticles = [...allArticles, ...articles];
        }
      }

      logger.info(`[NEWS] Raw stories: ${allArticles.length}`);
      
      // Filter out removed articles
      return allArticles.filter(a => a.title !== '[Removed]' && a.url);
    } catch (error) {
      logger.error(`[NEWS] ERROR: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  }

  /**
   * Search across everything (Discover Feed)
   */
  async searchNews(query) {
    if (!this.apiKey) {
      throw new Error('NEWS_API_KEY is missing');
    }
    
    if (!query) {
      return this.fetchLatestNews();
    }

    try {
      logger.info(`[NEWS] Fetching everything for query: ${query}`);
      const response = await axios.get(`${this.baseUrl}/everything`, {
        params: {
          q: query,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 20,
          apiKey: this.apiKey,
        },
      });

      if (response.data.status === 'ok') {
        const articles = response.data.articles.map((a) => ({
          ...a,
          _nuzioCategory: 'Search',
        }));
        logger.info(`[NEWS] Raw stories: ${articles.length}`);
        return articles.filter(a => a.title !== '[Removed]' && a.url);
      }
      return [];
    } catch (error) {
      logger.error(`[NEWS] ERROR: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  }
}

export default new NewsAPIProvider();
