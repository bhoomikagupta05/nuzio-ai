import mongoose from 'mongoose';
import config from '../config/env.js';
import User from '../models/User.js';
import logger from '../utils/logger.js';

/**
 * Manual Database Seed Script
 * Run with: npm run seed --workspace=backend
 * or: node src/scripts/seed.js
 */
const seedDatabase = async () => {
  logger.info('Connecting to MongoDB for manual seeding...');
  
  try {
    await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.success(`MongoDB connected: ${config.mongodbUri}`);

    const demoEmail = 'alex@nuzio.ai';

    // Remove existing demo user if present
    await User.deleteOne({ email: demoEmail });

    // Create rich seed user
    const seedUser = await User.create({
      name: 'Alex Morgan',
      email: demoEmail,
      password: 'NuzioDev2026!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      language: 'en',
      profession: 'Technology & Product Strategy',
      interests: [
        'AI & Generative Tech',
        'Financial Markets & VC',
        'Global Geopolitics',
        'Clean Energy & Climate',
        'Biotech & Health',
      ],
      narrator: {
        name: 'Aria',
        voiceId: 'aria',
      },
      briefTime: '7:00 AM',
      notificationsEnabled: true,
      plan: 'pro',
    });

    logger.success('Database seeded successfully with demo user:');
    logger.info(`- Name: ${seedUser.name}`);
    logger.info(`- Email: ${seedUser.email}`);
    logger.info(`- Password: NuzioDev2026!`);
    logger.info(`- Plan: ${seedUser.plan}`);
    logger.info(`- Interests: ${seedUser.interests.join(', ')}`);
    logger.info(`- Narrator: ${seedUser.narrator.name} (${seedUser.narrator.voiceId})`);
  } catch (error) {
    logger.error('Database seeding failed:', error.message);
  } finally {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed.');
    process.exit(0);
  }
};

seedDatabase();
