/**
 * Nuzio AI - Centralized Spacing Scale
 * 
 * Strict scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80
 */

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',

  // Semantic Spacing
  touchTarget: '44px',     // Accessible minimum touch target
  gutter: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
  },
  container: {
    max: '1280px',
    narrow: '680px',
    reading: '760px',
  },
};

export default spacing;
