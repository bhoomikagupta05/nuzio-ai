import { createTheme } from '@mui/material/styles';
import { colors } from './colors.js';
import { typography } from './typography.js';
import { radii } from './radii.js';
import { shadows } from './shadows.js';

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: colors.background,
      paper: colors.card.default,
    },
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colors.surface.secondary,
      contrastText: colors.text.primary,
    },
    success: {
      main: colors.state.success,
      contrastText: colors.background,
    },
    warning: {
      main: colors.state.warning,
      contrastText: colors.background,
    },
    error: {
      main: colors.state.danger,
      contrastText: '#FFFFFF',
    },
    info: {
      main: colors.state.info,
      contrastText: colors.background,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.muted,
    },
    divider: colors.border.subtle,
  },
  typography: {
    fontFamily: typography.fontFamily.base,
    h1: typography.presets.h1,
    h2: typography.presets.h2,
    h3: typography.presets.h3,
    body1: typography.presets.body,
    body2: typography.presets.bodySmall,
    caption: typography.presets.caption,
    button: {
      ...typography.presets.button,
      textTransform: 'none',
    },
    overline: typography.presets.overline,
  },
  shape: {
    borderRadius: parseInt(radii.card, 10) || 18,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: radii.large,
          minHeight: '44px',
          padding: '10px 20px',
          fontWeight: 600,
          textTransform: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:focus-visible': {
            boxShadow: shadows.focusRing,
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.primary.light} 0%, ${colors.primary.main} 100%)`,
          color: '#FFFFFF',
          boxShadow: shadows.buttonGlow,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primary.light} 10%, ${colors.primary.dark} 100%)`,
            boxShadow: shadows.purpleGlowStrong,
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.card.default,
          border: `1px solid ${colors.border.subtle}`,
          borderRadius: radii.card,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 44,
          height: 24,
          padding: 0,
        },
        switchBase: {
          padding: 2,
          '&.Mui-checked': {
            transform: 'translateX(20px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: colors.primary.main,
              opacity: 1,
              border: 0,
            },
          },
        },
        thumb: {
          width: 20,
          height: 20,
        },
        track: {
          borderRadius: 12,
          backgroundColor: colors.surface.secondary,
          border: `1px solid ${colors.border.subtle}`,
          opacity: 1,
        },
      },
    },
  },
});

export default muiTheme;
