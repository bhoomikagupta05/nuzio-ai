import { GoogleGenAI } from '@google/genai';
import config from '../../config/env.js';
import logger from '../../utils/logger.js';
import { getMorningBriefPrompt, getStorySummaryPrompt } from './promptTemplates.js';
import { validateBriefingSchema, validateStorySummarySchema } from './aiSchemas.js';

let aiClient = null;

// Initialize the GoogleGenAI SDK safely
if (config.geminiApiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey: config.geminiApiKey });
    logger.info('Gemini AI SDK initialized.');
  } catch (err) {
    logger.error('Failed to initialize Gemini AI SDK:', err.message);
  }
} else {
  logger.warn('GEMINI_API_KEY is missing. AI endpoints will use fallback data.');
}

/**
 * Extracts and parses JSON from the LLM's raw text response.
 * Handles cases where the LLM wraps the response in markdown blocks like ```json ... ```
 */
const parseJSONSafely = (rawText) => {
  try {
    const cleanedText = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    throw new Error('Failed to parse AI JSON response');
  }
};

/**
 * Generate a personalized Executive Morning Briefing
 */
export const generateBriefing = async (userPreferences, newsData) => {
  if (!aiClient) {
    throw new Error('AI Service unavailable (Missing API Key)');
  }

  const prompt = getMorningBriefPrompt(userPreferences, newsData);

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2, // Low temperature for deterministic/factual synthesis
        responseMimeType: 'application/json', // Force JSON structure
      },
    });

    const resultText = response.text;
    const parsedData = parseJSONSafely(resultText);

    if (!validateBriefingSchema(parsedData)) {
      throw new Error('AI Output failed schema validation');
    }

    return parsedData;
  } catch (error) {
    logger.error('generateBriefing error:', error.message);
    throw error;
  }
};

/**
 * Summarize an individual story
 */
export const summarizeStory = async (story) => {
  if (!aiClient) {
    throw new Error('AI Service unavailable (Missing API Key)');
  }

  const prompt = getStorySummaryPrompt(story);

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    });

    const resultText = response.text;
    const parsedData = parseJSONSafely(resultText);

    if (!validateStorySummarySchema(parsedData)) {
      throw new Error('AI Output failed schema validation');
    }

    return parsedData;
  } catch (error) {
    logger.error('summarizeStory error:', error.message);
    throw error;
  }
};

export default {
  generateBriefing,
  summarizeStory,
  isAvailable: !!aiClient,
};
