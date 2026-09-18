import axios from 'axios';

// Resolve base URL from environment or default to relative /api for Vite proxy
const baseURL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  '/api';

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor: Attach JWT authentication token if available
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('nuzio_auth_token');
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // localStorage unavailable in some test environments
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Standardize responses and error payloads
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const responseData = error.response?.data;
    const statusCode = error.response?.status || 500;

    const formattedError = {
      message:
        responseData?.message ||
        error.message ||
        'An unexpected network error occurred.',
      statusCode,
      errors: responseData?.errors || null,
      isNetworkError: !error.response,
    };

    // If 401 Unauthorized, token is expired or invalid
    if (statusCode === 401) {
      try {
        // Clear stored token on 401 if it's an authentication error
        if (localStorage.getItem('nuzio_auth_token')) {
          // Token is invalid/expired
          localStorage.removeItem('nuzio_auth_token');
        }
      } catch (e) {
        // ignore storage errors
      }
    }

    return Promise.reject(formattedError);
  }
);

export default apiClient;
