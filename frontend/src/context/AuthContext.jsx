import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { registerUser, loginUser, logoutUser, fetchCurrentUser } from '../services/authService.js';
import { updateUserProfile } from '../services/userService.js';

const TOKEN_KEY = 'nuzio_auth_token';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to persist or remove token
  const saveToken = (newToken) => {
    try {
      if (newToken) {
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
      } else {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }
    } catch {
      setToken(newToken || null);
    }
  };

  // Restore authenticated session on mount
  const refreshUser = useCallback(async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const response = await fetchCurrentUser();
      if (response && response.data && response.data.user) {
        setUser(response.data.user);
        return response.data.user;
      } else {
        saveToken(null);
        setUser(null);
        return null;
      }
    } catch (error) {
      saveToken(null);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  /**
   * Register a new user and initialize session
   */
  const register = async (registrationData) => {
    const response = await registerUser(registrationData);
    if (response && response.data) {
      const { user: newUser, token: authToken } = response.data;
      saveToken(authToken);
      setUser(newUser);
      return response.data;
    }
    return response;
  };

  /**
   * Log in user with credentials and initialize session
   */
  const login = async (credentials) => {
    const response = await loginUser(credentials);
    if (response && response.data) {
      const { user: loggedInUser, token: authToken } = response.data;
      saveToken(authToken);
      setUser(loggedInUser);
      return response.data;
    }
    return response;
  };

  /**
   * Log out current user
   */
  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Proceed with local logout regardless of server state
    } finally {
      saveToken(null);
      setUser(null);
    }
  };

  /**
   * Update current user profile and state
   */
  const updateProfile = async (updates) => {
    const response = await updateUserProfile(updates);
    if (response && response.data && response.data.user) {
      setUser(response.data.user);
      return response.data.user;
    }
    return response;
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    loading,
    register,
    login,
    logout,
    refreshUser,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
