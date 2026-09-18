import { successResponse } from '../utils/response.js';
import { getDBStatus } from '../config/db.js';
import config from '../config/env.js';

/**
 * Health check controller
 * Provides system status, uptime, environment, and DB connectivity info.
 */
export const getHealthStatus = (req, res) => {
  const dbStatus = getDBStatus();

  const healthData = {
    service: 'Nuzio AI Backend API',
    status: 'online',
    version: '1.0.0',
    environment: config.nodeEnv,
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStatus.state,
      connected: dbStatus.isConnected,
    },
    system: {
      nodeVersion: process.version,
      memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    },
    timestamp: new Date().toISOString(),
  };

  return successResponse(res, healthData, 'Nuzio AI API is operational');
};
