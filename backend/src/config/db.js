import mongoose from 'mongoose';
import config from './env.js';
import logger from '../utils/logger.js';

let isConnected = false;

// Attach error listener to mongoose connection to avoid unhandled error events
mongoose.connection.on('error', (err) => {
  logger.warn(`MongoDB runtime notice: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
});

export const connectDB = async () => {
  if (isConnected) {
    logger.info('Using existing MongoDB connection.');
    return;
  }

  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      dbName: 'nuzio',
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = conn.connection.readyState === 1;
    logger.success(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    isConnected = false;
    logger.warn(`MongoDB Connection Notice: ${error.message}`);
    logger.warn('Server running without active MongoDB connection (DB-dependent operations will be unavailable until MongoDB is started).');
  }
};

export const getDBStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized',
  };
  const stateCode = mongoose.connection.readyState;
  return {
    state: states[stateCode] || 'disconnected',
    statusCode: stateCode,
    isConnected: stateCode === 1,
  };
};

export default connectDB;
