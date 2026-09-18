import apiClient from './api.js';

/**
 * User Profile API Service
 */
export const getUserProfile = async () => {
  return await apiClient.get('/users/me');
};

export const updateUserProfile = async (updates) => {
  return await apiClient.patch('/users/me', updates);
};

export default {
  getUserProfile,
  updateUserProfile,
};
