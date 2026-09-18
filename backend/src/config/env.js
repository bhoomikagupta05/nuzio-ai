import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend directory and root workspace directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const port = Number(process.env.PORT) || 5000;

console.log('GEMINI_API_KEY configured:', Boolean(process.env.GEMINI_API_KEY));

export const config = {
  port,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nuzio',
  jwtSecret: process.env.JWT_SECRET || 'nuzio_dev_secret_key_2026_secure',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  geminiApiKey: process.env.GEMINI_API_KEY,
  newsApiKey: process.env.NEWS_API_KEY,
  newsApiAiKey: process.env.NEWSAPI_AI_KEY,
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  isProd: process.env.NODE_ENV === 'production',
};

export default config;
