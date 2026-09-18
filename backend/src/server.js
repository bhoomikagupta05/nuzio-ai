import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/env.js';
import connectDB from './config/db.js';
import apiRouter from './routes/index.js';
import aiRoutes from './routes/aiRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';

const app = express();

// Enable CORS for frontend client
app.use(
  cors({
    origin: [
      config.clientUrl,
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (config.isDev) {
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
  });
}

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'Nuzio AI API',
    version: '1.0.0',
    description: 'Personalized AI-powered daily news briefing backend',
    health: '/api/health',
  });
});

// Mount main API routes
app.use('/api', apiRouter);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Global exception safety nets
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err.message, err.stack);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Promise Rejection:', reason);
});

// Start server
let server = null;
let isShuttingDown = false;

const gracefulShutdown = (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info(`Received ${signal}. Shutting down server gracefully...`);

  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed.');
      try {
        if (mongoose.connection.readyState === 1) {
          await mongoose.connection.close(false);
          logger.info('MongoDB connection closed.');
        }
      } catch (err) {
        logger.warn(`Error while closing MongoDB connection: ${err.message}`);
      }
      process.exit(0);
    });

    // Force terminate if graceful shutdown takes longer than 2s
    setTimeout(() => {
      logger.info('Forcing process exit.');
      process.exit(0);
    }, 2000).unref();
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));

const startServer = async () => {
  // Connect to Database gracefully (non-blocking fallback)
  await connectDB();

  server = app.listen(config.port, () => {
    logger.success(`Nuzio AI Backend Server running on http://localhost:${config.port}`);
    logger.info(`Environment: ${config.nodeEnv}`);
    logger.info(`Health check available at: http://localhost:${config.port}/api/health`);
  });

  // Handle server-level listen errors (e.g. EADDRINUSE)
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      logger.error(`Port ${config.port} is already in use (EADDRINUSE). Please free port ${config.port} or set a different PORT in environment variables.`);
    } else {
      logger.error(`HTTP Server error: ${err.message}`);
    }
    process.exit(1);
  });
};

startServer().catch((err) => {
  logger.error('Failed to start server:', err);
});

export default app;
// Trigger nodemon restart
