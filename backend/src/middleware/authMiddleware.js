import jwt from 'jsonwebtoken';
import config from '../config/env.js';
import User from '../models/User.js';
import { errorResponse } from '../utils/response.js';

/**
 * Generate a signed JWT token containing the user ID in the payload.
 * 
 * @param {string|mongoose.Types.ObjectId} userId
 * @returns {string} Signed JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId.toString() },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn || '7d' }
  );
};

/**
 * Express middleware to authenticate requests via JWT Bearer token.
 * Validates token signature, expiration, and extracts the user record.
 */
export const verifyToken = async (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return errorResponse(
        res,
        'Access denied. No authentication token provided.',
        401
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwtSecret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 'Authentication token has expired. Please sign in again.', 401);
      }
      return errorResponse(res, 'Invalid authentication token. Authorization failed.', 401);
    }

    if (!decoded || !decoded.id) {
      return errorResponse(res, 'Malformed token payload.', 401);
    }

    // Fetch user from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return errorResponse(
        res,
        'The user associated with this token no longer exists.',
        401
      );
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, `Authentication error: ${error.message}`, 500);
  }
};

export default {
  generateToken,
  verifyToken,
};
