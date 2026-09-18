import apiClient from './api.js';

/**
 * Authentication API Service
 */
export const registerUser = async (registrationData) => {
  return await apiClient.post('/auth/register', registrationData);
};

export const loginUser = async (credentials) => {
  return await apiClient.post('/auth/login', credentials);
};

export const logoutUser = async () => {
  return await apiClient.post('/auth/logout');
};

export const fetchCurrentUser = async () => {
  return await apiClient.get('/auth/me');
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
};
