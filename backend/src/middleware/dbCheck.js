import { getDBStatus } from '../config/db.js';
import { errorResponse } from '../utils/response.js';

/**
 * Middleware to protect database-dependent routes.
 * If MongoDB is not connected, returns a 503 Service Unavailable error
 * instead of hanging or crashing the server.
 */
export const requireDB = (req, res, next) => {
  const dbStatus = getDBStatus();
  if (!dbStatus.isConnected) {
    return errorResponse(
      res,
      'Database service is currently unavailable. This operation requires an active MongoDB connection.',
      503,
      {
        dbState: dbStatus.state,
        suggestion: 'Please ensure MongoDB is running.',
      }
    );
  }
  next();
};

export default requireDB;
