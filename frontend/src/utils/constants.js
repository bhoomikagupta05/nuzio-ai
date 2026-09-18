export const APP_NAME = 'Nuzio AI';
export const APP_TAGLINE = 'Personalized AI-Powered Daily News Briefings';

export const API_ENDPOINTS = {
  HEALTH: '/health',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  BRIEF: {
    DAILY: '/briefs/daily',
    STREAM: '/briefs/stream',
  },
};

export const SUPPORTED_VIEWPORTS = [
  { width: 320, label: '320px (iPhone SE/Fold)' },
  { width: 375, label: '375px (iPhone mini)' },
  { width: 390, label: '390px (iPhone 14/15)' },
  { width: 430, label: '430px (iPhone Pro Max)' },
  { width: 768, label: '768px (iPad portrait)' },
  { width: 1024, label: '1024px (iPad Pro/Laptop)' },
  { width: 1440, label: '1440px (Desktop)' },
  { width: 1920, label: '1920px (Ultra-wide)' },
];
