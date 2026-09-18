/**
 * Nuzio AI - Centralized Color Design Tokens
 * 
 * Strict palette adhering to the Nuzio AI aesthetic:
 * - Premium dark UI
 * - Near-black background with subtle purple undertones
 * - Purple/Violet primary accent
 * - Mint/Green success indicator
 * - Soft borders and atmospheric glow
 */

export const colors = {
  // Backgrounds & Surfaces
  background: '#08090B',
  surface: {
    primary: '#101116',
    secondary: '#15161C',
    subtle: '#14161E',
    overlay: 'rgba(8, 9, 11, 0.85)',
  },

  // Cards
  card: {
    default: '#17171D',
    hover: '#1D1E26',
    active: '#22232E',
    elevated: '#1A1B22',
  },

  // Primary Violet/Purple Accent
  primary: {
    main: '#7657FF',
    light: '#8B6CFF',
    dark: '#5E3DE0',
    subtle: 'rgba(118, 87, 255, 0.12)',
    muted: 'rgba(118, 87, 255, 0.20)',
    glow: 'rgba(118, 87, 255, 0.25)',
    glowStrong: 'rgba(118, 87, 255, 0.45)',
  },

  // Feedback & State Colors
  state: {
    success: '#3DDC97',
    successSubtle: 'rgba(61, 220, 151, 0.15)',
    warning: '#FDB022',
    warningSubtle: 'rgba(253, 176, 34, 0.15)',
    danger: '#F04438',
    dangerSubtle: 'rgba(240, 68, 56, 0.15)',
    info: '#22D3EE',
    infoSubtle: 'rgba(34, 211, 238, 0.15)',
  },

  // Typography Colors
  text: {
    primary: '#F5F5F7',
    secondary: '#92929D',
    muted: '#686873',
    inverse: '#08090B',
    accent: '#8B6CFF',
  },

  // Borders & Dividers
  border: {
    subtle: 'rgba(255, 255, 255, 0.10)',
    hover: 'rgba(255, 255, 255, 0.18)',
    active: 'rgba(118, 87, 255, 0.50)',
    strong: 'rgba(118, 87, 255, 0.45)',
    divider: 'rgba(255, 255, 255, 0.08)',
  },

  // Glassmorphism Values
  glass: {
    surface: 'rgba(23, 23, 29, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.10)',
    blur: '16px',
  },
};

export default colors;
