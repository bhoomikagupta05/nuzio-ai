/**
 * Nuzio AI Design Tokens
 * Centralized token system for colors, typography, spacing, shadows, and breakpoints.
 */

export const tokens = {
  colors: {
    background: '#08090B',
    surface: '#111217',
    surfaceSubtle: '#14161E',
    card: '#15151B',
    cardHover: '#1B1B24',
    primary: '#7657FF',
    primaryLight: '#8B6CFF',
    primaryDark: '#5D3FE0',
    success: '#3DDC97',
    successSubtle: 'rgba(61, 220, 151, 0.15)',
    warning: '#FDB022',
    error: '#F04438',
    textPrimary: '#F5F5F7',
    textSecondary: '#92929D',
    textMuted: '#686873',
    border: 'rgba(255, 255, 255, 0.10)',
    borderHover: 'rgba(255, 255, 255, 0.18)',
    borderActive: 'rgba(118, 87, 255, 0.50)',
    purpleGlow: 'rgba(118, 87, 255, 0.25)',
    purpleGlowSubtle: 'rgba(118, 87, 255, 0.12)',
    purpleGlowStrong: 'rgba(118, 87, 255, 0.45)',
  },
  typography: {
    fontFamilyHeading: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontFamilyBody: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    lineHeight: {
      tight: 1.15,
      snug: 1.3,
      normal: 1.5,
      relaxed: 1.625,
    },
  },
  radii: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.35)',
    md: '0 4px 16px rgba(0, 0, 0, 0.45)',
    lg: '0 10px 30px rgba(0, 0, 0, 0.60)',
    glow: '0 0 24px rgba(118, 87, 255, 0.25)',
    glowStrong: '0 0 36px rgba(118, 87, 255, 0.45)',
  },
  breakpoints: {
    mobileSm: '320px',
    mobileBase: '360px',
    mobile: '375px',
    mobileMd: '390px',
    mobileLg: '414px',
    mobileXl: '430px',
    tablet: '768px',
    tabletLg: '834px',
    desktopSm: '1024px',
    desktop: '1280px',
    desktopLg: '1440px',
    desktopXl: '1920px',
  },
  glass: {
    card: 'rgba(21, 21, 27, 0.75)',
    blur: '16px',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export default tokens;
