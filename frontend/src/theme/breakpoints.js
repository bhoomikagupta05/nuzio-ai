/**
 * Nuzio AI - Centralized Responsive Breakpoints
 * 
 * Supports full range of targets:
 * Mobile: 320px, 360px, 375px, 390px, 414px, 430px
 * Tablet: 768px, 834px
 * Desktop: 1024px, 1280px, 1440px, 1920px
 */

export const breakpoints = {
  values: {
    mobileSm: 320,
    mobileBase: 360,
    mobile: 375,
    mobileMd: 390,
    mobileLg: 414,
    mobileXl: 430,
    tablet: 768,
    tabletLg: 834,
    desktopSm: 1024,
    desktop: 1280,
    desktopLg: 1440,
    desktopXl: 1920,
  },

  media: {
    mobileSm: '@media (min-width: 320px)',
    mobile: '@media (min-width: 375px)',
    mobileXl: '@media (min-width: 430px)',
    tablet: '@media (min-width: 768px)',
    tabletLg: '@media (min-width: 834px)',
    desktopSm: '@media (min-width: 1024px)',
    desktop: '@media (min-width: 1280px)',
    desktopLg: '@media (min-width: 1440px)',
    desktopXl: '@media (min-width: 1920px)',
    
    // Max-width queries for mobile-specific styles
    maxMobile: '@media (max-width: 767px)',
    maxTablet: '@media (max-width: 1023px)',
  },
};

export default breakpoints;
