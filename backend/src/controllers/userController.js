import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';
import logger from '../utils/logger.js';

/**
 * Get current user profile
 * GET /api/users/me
 */
export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return errorResponse(res, 'Unauthorized', 401);
    }
    return successResponse(res, { user: req.user.toSanitized() }, 'User profile retrieved');
  } catch (error) {
    logger.error('Get profile error:', error);
    return errorResponse(res, error.message || 'Failed to retrieve profile', 500);
  }
};

/**
 * Update user preferences and profile
 * PATCH /api/users/me
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const allowedFields = [
      'name',
      'avatar',
      'language',
      'profession',
      'interests',
      'narrator',
      'briefTime',
      'notificationsEnabled',
      'plan',
      'savedArticles',
    ];

    const updates = {};
    const validationErrors = [];

    // Check for prohibited fields
    const prohibitedFields = ['_id', 'id', 'password', 'email', 'createdAt', 'updatedAt'];
    for (const field of prohibitedFields) {
      if (req.body[field] !== undefined) {
        validationErrors.push({
          field,
          message: `Field '${field}' cannot be updated through this endpoint`,
        });
      }
    }

    // Validate and whitelist fields
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        const value = req.body[field];

        if (field === 'name') {
          if (typeof value !== 'string' || value.trim().length < 2) {
            validationErrors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
          } else {
            updates.name = value.trim();
          }
        } else if (field === 'language') {
          const supported = ['en', 'hi', 'es', 'fr', 'de', 'ja'];
          if (!supported.includes(value)) {
            validationErrors.push({ field: 'language', message: `Language must be one of: ${supported.join(', ')}` });
          } else {
            updates.language = value;
          }
        } else if (field === 'interests') {
          if (!Array.isArray(value)) {
            validationErrors.push({ field: 'interests', message: 'Interests must be an array of strings' });
          } else {
            updates.interests = value.map((i) => String(i).trim()).filter(Boolean).slice(0, 15);
          }
        } else if (field === 'savedArticles') {
          if (!Array.isArray(value)) {
            validationErrors.push({ field: 'savedArticles', message: 'savedArticles must be an array of string IDs' });
          } else {
            updates.savedArticles = value.map((i) => String(i).trim()).filter(Boolean);
          }
        } else if (field === 'plan') {
          if (!['free', 'pro'].includes(value)) {
            validationErrors.push({ field: 'plan', message: "Plan must be 'free' or 'pro'" });
          } else {
            updates.plan = value;
          }
        } else if (field === 'narrator') {
          if (typeof value === 'object' && value !== null) {
            updates.narrator = {
              name: String(value.name || 'Aria'),
              voiceId: String(value.voiceId || 'aria'),
            };
          } else if (typeof value === 'string') {
            updates.narrator = {
              name: value,
              voiceId: value.toLowerCase(),
            };
          }
        } else if (field === 'notificationsEnabled') {
          updates.notificationsEnabled = Boolean(value);
        } else if (field === 'briefTime') {
          updates.briefTime = String(value);
        } else if (field === 'profession') {
          updates.profession = value ? String(value).trim() : null;
        } else if (field === 'avatar') {
          updates.avatar = value ? String(value).trim() : null;
        }
      }
    }

    if (validationErrors.length > 0) {
      return errorResponse(res, 'Validation failed', 400, validationErrors);
    }

    if (Object.keys(updates).length === 0) {
      return errorResponse(res, 'No valid fields provided to update', 400);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return errorResponse(res, 'User not found', 404);
    }

    logger.info(`User profile updated: ${updatedUser.email} (${updatedUser._id})`);

    return successResponse(
      res,
      { user: updatedUser.toSanitized() },
      'Profile updated successfully'
    );
  } catch (error) {
    logger.error('Update profile error:', error);
    return errorResponse(res, error.message || 'Failed to update profile', 500);
  }
};

/**
 * Toggle bookmark for an article
 * POST /api/users/me/bookmarks
 */
export const toggleBookmark = async (req, res) => {
  try {
    const { articleId } = req.body;
    if (!articleId) {
      return errorResponse(res, 'articleId is required', 400);
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    const index = user.savedArticles.indexOf(articleId);
    let bookmarked = false;
    if (index > -1) {
      user.savedArticles.splice(index, 1);
      bookmarked = false;
    } else {
      user.savedArticles.push(articleId);
      bookmarked = true;
    }

    await user.save();

    return successResponse(
      res,
      { bookmarked, savedArticles: user.savedArticles },
      bookmarked ? 'Article bookmarked' : 'Article bookmark removed'
    );
  } catch (error) {
    logger.error('Toggle bookmark error:', error);
    return errorResponse(res, error.message || 'Failed to toggle bookmark', 500);
  }
};

export default {
  getProfile,
  updateProfile,
  toggleBookmark,
};
