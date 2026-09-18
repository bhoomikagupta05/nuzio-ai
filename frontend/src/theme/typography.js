/**
 * Nuzio AI - Centralized Typography Design Tokens
 * 
 * Clean, modern sans-serif system inspired by the Figma reference:
 * - Strong white headings
 * - Muted secondary information
 * - Compact labels & tags
 * - Accessible line heights
 */

export const typography = {
  fontFamily: {
    base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Semantic Typography Presets
  presets: {
    display: {
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      fontSize: '2.5rem',      // 40px
      lineHeight: 1.15,
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h1: {
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      fontSize: '2rem',        // 32px
      lineHeight: 1.2,
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      fontSize: '1.5rem',      // 24px
      lineHeight: 1.25,
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      fontSize: '1.25rem',     // 20px
      lineHeight: 1.3,
      fontWeight: 600,
      letterSpacing: '-0.015em',
    },
    body: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '1rem',        // 16px
      lineHeight: 1.5,
      fontWeight: 400,
      letterSpacing: '0em',
    },
    bodySmall: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.875rem',    // 14px
      lineHeight: 1.45,
      fontWeight: 400,
      letterSpacing: '0.005em',
    },
    caption: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.75rem',     // 12px
      lineHeight: 1.4,
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    button: {
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      fontSize: '0.925rem',    // 14.8px
      lineHeight: 1,
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    label: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.8125rem',   // 13px
      lineHeight: 1.3,
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    overline: {
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      fontSize: '0.6875rem',   // 11px
      lineHeight: 1.3,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },
};

export default typography;
