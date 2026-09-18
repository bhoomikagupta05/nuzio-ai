import mongoose from 'mongoose';
import Article from '../models/Article.js';

const run = async () => {
  await mongoose.connect('mongodb+srv://admin:Admin@cluster0.fzpd0te.mongodb.net/nuzio?retryWrites=true&w=majority');
  const count = await Article.countDocuments();
  console.log('Articles count:', count);
  process.exit(0);
};

run();
