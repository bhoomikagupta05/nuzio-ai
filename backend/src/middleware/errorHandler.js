import { errorResponse } from '../utils/response.js';
import logger from '../utils/logger.js';

export const notFoundHandler = (req, res, next) => {
  errorResponse(res, `Endpoint not found: ${req.method} ${req.originalUrl}`, 404);
};

export const errorHandler = (err, req, res, next) => {
  logger.error(`Unhandled Error: ${err.message}`, err.stack);

  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);
  const message = err.message || 'Internal Server Error';

  return errorResponse(res, message, statusCode, process.env.NODE_ENV === 'development' ? { stack: err.stack } : null);
};
