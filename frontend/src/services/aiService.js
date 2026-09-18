import api from './api.js';

export const aiService = {
  /**
   * Request a personalized Executive Morning Briefing
   */
  getDailyBriefing: async () => {
    try {
      const response = await api.post('/ai/briefing');
      return response.data.briefing;
    } catch (error) {
      console.error('getDailyBriefing error:', error);
      throw error;
    }
  },

  /**
   * Request a summarized version of a specific story
   * @param {string} storyId
   */
  getStorySummary: async (storyId) => {
    try {
      const response = await api.post('/ai/summarize', { storyId });
      return response.data.summary;
    } catch (error) {
      console.error('getStorySummary error:', error);
      throw error;
    }
  },
};

export default aiService;
