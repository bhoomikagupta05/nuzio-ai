import mongoose from 'mongoose';

/**
 * Article Schema Definition
 * Represents a synthesized executive news briefing article.
 */
const articleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Article summary is required'],
      trim: true,
    },
    bulletPoints: {
      type: [String],
      default: [],
    },
    content: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true,
    },
    source: {
      name: { type: String, default: 'Nuzio Intelligence' },
      url: { type: String, default: '' },
      publishedAt: { type: String, default: '' },
    },
    readTime: {
      type: String,
      default: '2 min read',
    },
    audioDuration: {
      type: String,
      default: '1:45',
    },
    audioUrl: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Article = mongoose.model('Article', articleSchema);
export default Article;
