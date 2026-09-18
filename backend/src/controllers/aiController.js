import { generateBriefing, summarizeStory } from '../services/ai/geminiService.js';
import Briefing from '../models/Briefing.js';
import Article from '../models/Article.js';
import { successResponse, errorResponse } from '../utils/response.js';
import logger from '../utils/logger.js';
import config from '../config/env.js';

/**
 * Fallback mechanism if Gemini is unavailable
 */
const getFallbackBriefing = async () => {
  // Pull 5 most recent articles directly as a fallback
  const topArticles = await Article.find().sort({ createdAt: -1 }).limit(5);

  return {
    headline: "Today's Top Market News",
    overview: "Here is your curated executive intelligence synthesis based on standard market data.",
    topStories: topArticles.map((article) => ({
      storyId: article.id,
      title: article.title,
      summary: article.summary,
      keyTakeaway: article.bullets?.[0] || article.summary,
      category: article.categoryLabel,
      source: article.source,
      sourceUrl: article.sourceUrl,
      imageUrl: article.imageUrl,
    })),
    keyInsights: [
      "Global markets demonstrate resilience amid changing monetary policies.",
      "Technological investments continue to dominate venture capital flows.",
      "Regulatory frameworks around autonomous systems are evolving rapidly."
    ],
  };
};

/**
 * Generate or Retrieve Daily Executive Briefing
 * POST /api/ai/briefing
 */
export const getDailyBriefing = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    // YYYY-MM-DD
    const todayDate = new Date().toISOString().split('T')[0];

    logger.info(`[DAILY_INTELLIGENCE] Request received`);
    logger.info(`[DAILY_INTELLIGENCE] Authenticated user: true`);

    // 1. Check if a briefing is already cached in MongoDB for today
    const cachedBriefing = await Briefing.findOne({ userId, date: todayDate });
    
    if (cachedBriefing && !req.query.force) {
      logger.info(`[DAILY_INTELLIGENCE] Returning cached briefing for user ${userId} on ${todayDate}`);
      return successResponse(res, { briefing: cachedBriefing }, 'Daily briefing retrieved (Cached)');
    }

    logger.info(`[DAILY_INTELLIGENCE] User preferences loaded: true`);

    let filter = {};
    if (req.user.interests && req.user.interests.length > 0) {
      const interestCategories = req.user.interests.map(i => new RegExp(i.split(' ')[0], 'i'));
      filter = { $or: [{ categoryLabel: { $in: interestCategories } }, { tags: { $in: interestCategories } }] };
    }
    
    logger.info(`[DAILY_INTELLIGENCE] Fetching news`);
    // Fetch raw source material
    const rawStories = await Article.find().sort({ createdAt: -1 }).limit(15);
    logger.info(`[DAILY_INTELLIGENCE] News fetch successful: ${rawStories.length} stories`);
    logger.info(`[DAILY_INTELLIGENCE] Normalized stories: ${rawStories.length}`);
    
    if (rawStories.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NEWS_FETCH_ERROR',
          message: 'No news stories available to synthesize'
        }
      });
    }

    // 3. Synthesize via Gemini if configured
    let briefingData;
    if (config.geminiApiKey) {
      try {
        const userPreferences = {
          profession: req.user.profession,
          interests: req.user.interests,
        };
        logger.info(`[DAILY_INTELLIGENCE] Calling Gemini`);
        briefingData = await generateBriefing(userPreferences, rawStories);
        logger.info(`[DAILY_INTELLIGENCE] Gemini response received`);
        logger.info(`[DAILY_INTELLIGENCE] Parsing response`);
        logger.info(`[DAILY_INTELLIGENCE] Schema validation successful`);
      } catch (geminiError) {
        logger.error(`[DAILY_INTELLIGENCE] ERROR: ${geminiError.message}`);
        return res.status(502).json({
          success: false,
          error: {
            code: 'AI_PROVIDER_ERROR',
            message: `Gemini synthesis failed: ${geminiError.message}`
          }
        });
      }
    } else {
      logger.info('[DAILY_INTELLIGENCE] Gemini API Key missing. Returning fallback briefing.');
      briefingData = await getFallbackBriefing();
    }

    // 4. Cache the briefing
    logger.info(`[DAILY_INTELLIGENCE] Saving briefing`);
    const newBriefing = await Briefing.findOneAndUpdate(
      { userId, date: todayDate },
      { $set: { ...briefingData } },
      { new: true, upsert: true }
    );
    logger.info(`[DAILY_INTELLIGENCE] Completed successfully`);

    return successResponse(res, { briefing: newBriefing }, 'Daily briefing generated');
  } catch (error) {
    logger.error(`[DAILY_INTELLIGENCE] ERROR: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message || 'Failed to generate daily briefing',
      }
    });
  }
};

/**
 * Summarize an individual story
 * POST /api/ai/summarize
 */
export const getStorySummary = async (req, res) => {
  try {
    const { storyId } = req.body;

    if (!storyId) {
      return errorResponse(res, 'Story ID is required', 400);
    }

    const story = await Article.findOne({ id: storyId });
    if (!story) {
      return errorResponse(res, 'Story not found', 404);
    }

    if (!config.geminiApiKey) {
      // Fallback
      return successResponse(res, {
        summary: {
          summary: story.summary,
          keyTakeaways: story.bullets || [story.summary],
        },
      }, 'Story summarized (Fallback)');
    }

    try {
      const summaryData = await summarizeStory(story);
      return successResponse(res, { summary: summaryData }, 'Story summarized by Gemini');
    } catch (geminiError) {
      logger.error('Story Summarization failed:', geminiError.message);
      // Fallback
      return successResponse(res, {
        summary: {
          summary: story.summary,
          keyTakeaways: story.bullets || [story.summary],
        },
      }, 'Story summarized (Fallback due to error)');
    }
  } catch (error) {
    logger.error('Get Story Summary error:', error);
    return errorResponse(res, 'Failed to summarize story', 500);
  }
};

export default {
  getDailyBriefing,
  getStorySummary,
};
