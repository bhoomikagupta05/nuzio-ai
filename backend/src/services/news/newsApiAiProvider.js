import axios from 'axios';
import config from '../../config/env.js';
import logger from '../../utils/logger.js';

export class NewsApiAiProvider {
  constructor() {
    this.apiKey = config.newsApiAiKey;
    this.baseUrl = 'https://eventregistry.org/api/v1/article/getArticles';
    
    this.defaultCategories = ['technology', 'business'];
  }

  /**
   * Fetch top headlines/articles matching categories
   */
  async fetchLatestNews(categories = []) {
    if (!this.apiKey) {
      throw new Error('NEWSAPI_AI_KEY is missing');
    }

    try {
      const catsToFetch = categories.length > 0 ? categories : this.defaultCategories;
      
      logger.info(`[NEWSAPI_AI] Fetching latest stories for categories: ${catsToFetch.join(', ')}`);
      
      // NewsAPI.ai (EventRegistry) uses a JSON body for advanced queries
      const query = {
        $query: {
          $and: [
            {
              keyword: {
                $or: catsToFetch
              }
            },
            { lang: "eng" }
          ]
        },
        $filter: {
          forceMaxDataTimeWindow: "31"
        }
      };

      const response = await axios.post(this.baseUrl, {
        query: JSON.stringify(query),
        resultType: "articles",
        articlesSortBy: "date",
        articlesCount: 20,
        articleBodyLen: -1,
        apiKey: this.apiKey,
      });

      if (response.data && response.data.articles && response.data.articles.results) {
        const articles = response.data.articles.results.map((a) => ({
          ...a,
          _nuzioCategory: catsToFetch[0] // Tag with the primary category for normalization
        }));
        
        logger.info(`[NEWSAPI_AI] Raw stories received: ${articles.length}`);
        return articles;
      }
      
      return [];
    } catch (error) {
      logger.error(`[NEWSAPI_AI] ERROR: ${error.response?.data?.error || error.message}`);
      throw error;
    }
  }

  /**
   * Search across everything (Discover Feed)
   */
  async searchNews(keywordQuery) {
    if (!this.apiKey) {
      throw new Error('NEWSAPI_AI_KEY is missing');
    }
    
    if (!keywordQuery) {
      return this.fetchLatestNews();
    }

    try {
      logger.info(`[NEWSAPI_AI] Fetching everything for query: ${keywordQuery}`);
      
      const query = {
        $query: {
          $and: [
            { keyword: keywordQuery },
            { lang: "eng" }
          ]
        },
        $filter: {
          forceMaxDataTimeWindow: "31"
        }
      };

      const response = await axios.post(this.baseUrl, {
        query: JSON.stringify(query),
        resultType: "articles",
        articlesSortBy: "date",
        articlesCount: 20,
        articleBodyLen: -1,
        apiKey: this.apiKey,
      });

      if (response.data && response.data.articles && response.data.articles.results) {
        const articles = response.data.articles.results.map((a) => ({
          ...a,
          _nuzioCategory: 'Search',
        }));
        logger.info(`[NEWSAPI_AI] Raw search stories received: ${articles.length}`);
        return articles;
      }
      return [];
    } catch (error) {
      logger.error(`[NEWSAPI_AI] ERROR: ${error.response?.data?.error || error.message}`);
      throw error;
    }
  }
}

export default new NewsApiAiProvider();
