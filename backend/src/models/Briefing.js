import mongoose from 'mongoose';

/**
 * Briefing Schema
 * Caches the daily Gemini AI synthesis for a user to prevent redundant API calls.
 */
const briefingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: String, // Format: YYYY-MM-DD
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    topStories: [
      {
        storyId: String,
        title: String,
        summary: String,
        keyTakeaway: String,
        category: String,
        source: String,
        sourceUrl: String,
        imageUrl: String, // Include imageUrl for frontend rendering
      },
    ],
    keyInsights: [String],
    promptVersion: {
      type: String,
      default: 'v1',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate briefings for the same user on the same day
briefingSchema.index({ userId: 1, date: 1 }, { unique: true });

export const Briefing = mongoose.model('Briefing', briefingSchema);
export default Briefing;
