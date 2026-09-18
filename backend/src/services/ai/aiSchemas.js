/**
 * AI Schema Validation
 * Lightweight manual validation to ensure Gemini outputs match expectations.
 */

export const validateBriefingSchema = (data) => {
  if (typeof data !== 'object' || data === null) return false;
  if (typeof data.headline !== 'string') return false;
  if (typeof data.overview !== 'string') return false;
  if (!Array.isArray(data.topStories)) return false;
  if (!Array.isArray(data.keyInsights)) return false;

  for (const story of data.topStories) {
    if (
      typeof story.storyId !== 'string' ||
      typeof story.title !== 'string' ||
      typeof story.summary !== 'string' ||
      typeof story.keyTakeaway !== 'string'
    ) {
      return false;
    }
  }

  return true;
};

export const validateStorySummarySchema = (data) => {
  if (typeof data !== 'object' || data === null) return false;
  if (typeof data.summary !== 'string') return false;
  if (!Array.isArray(data.keyTakeaways)) return false;
  return true;
};
