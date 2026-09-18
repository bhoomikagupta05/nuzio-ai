import apiClient from './api.js';

/**
 * Health check API service
 * Fetches status from backend /api/health
 */
export const checkBackendHealth = async () => {
  return await apiClient.get('/health');
};

export default {
  checkBackendHealth,
};
