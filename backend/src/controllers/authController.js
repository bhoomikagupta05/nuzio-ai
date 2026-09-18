import User from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';
import { successResponse, errorResponse } from '../utils/response.js';
import logger from '../utils/logger.js';

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      avatar,
      language,
      profession,
      interests,
      narrator,
      briefTime,
      notificationsEnabled,
    } = req.body;

    const validationErrors = [];

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      validationErrors.push({ field: 'name', message: 'Name is required' });
    } else if (name.trim().length < 2) {
      validationErrors.push({ field: 'name', message: 'Name must be at least 2 characters' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      validationErrors.push({ field: 'email', message: 'A valid email address is required' });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      validationErrors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
    }

    if (validationErrors.length > 0) {
      return errorResponse(res, 'Validation failed', 400, validationErrors);
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return errorResponse(res, 'An account with this email address already exists.', 409, [
        { field: 'email', message: 'Email is already registered' },
      ]);
    }

    // Build user document with optional onboarding preferences
    const userData = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    if (avatar) userData.avatar = avatar;
    if (language) userData.language = language;
    if (profession) userData.profession = profession;
    if (Array.isArray(interests)) userData.interests = interests;
    if (narrator && typeof narrator === 'object') {
      userData.narrator = {
        name: narrator.name || 'Aria',
        voiceId: narrator.voiceId || 'aria',
      };
    } else if (typeof narrator === 'string') {
      userData.narrator = {
        name: narrator,
        voiceId: narrator.toLowerCase(),
      };
    }
    if (briefTime) userData.briefTime = briefTime;
    if (typeof notificationsEnabled === 'boolean') {
      userData.notificationsEnabled = notificationsEnabled;
    }

    const newUser = await User.create(userData);
    const token = generateToken(newUser._id);

    logger.info(`User registered successfully: ${newUser.email} (${newUser._id})`);

    return successResponse(
      res,
      {
        user: newUser.toSanitized(),
        token,
      },
      'Account created successfully',
      201
    );
  } catch (error) {
    logger.error('Registration error:', error);
    return errorResponse(res, error.message || 'Failed to create account', 500);
  }
};

/**
 * Log in an existing user
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationErrors = [];
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      validationErrors.push({ field: 'email', message: 'Email is required' });
    }
    if (!password || typeof password !== 'string' || password.length === 0) {
      validationErrors.push({ field: 'password', message: 'Password is required' });
    }

    if (validationErrors.length > 0) {
      return errorResponse(res, 'Validation failed', 400, validationErrors);
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Query user and explicitly include password field
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // Verify password hash
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    const token = generateToken(user._id);

    logger.info(`User logged in successfully: ${user.email} (${user._id})`);

    return successResponse(
      res,
      {
        user: user.toSanitized(),
        token,
      },
      'Signed in successfully'
    );
  } catch (error) {
    logger.error('Login error:', error);
    return errorResponse(res, error.message || 'Failed to sign in', 500);
  }
};

/**
 * Get current authenticated user
 * GET /api/auth/me
 */
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return errorResponse(res, 'Unauthorized', 401);
    }

    return successResponse(
      res,
      {
        user: req.user.toSanitized(),
      },
      'Current user profile retrieved'
    );
  } catch (error) {
    logger.error('Get current user error:', error);
    return errorResponse(res, error.message || 'Failed to fetch user', 500);
  }
};

/**
 * Log out current session
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  try {
    return successResponse(
      res,
      null,
      'Signed out successfully'
    );
  } catch (error) {
    logger.error('Logout error:', error);
    return errorResponse(res, error.message || 'Failed to log out', 500);
  }
};

export default {
  register,
  login,
  getCurrentUser,
  logout,
};
