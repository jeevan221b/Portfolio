import { createTheme } from '@mui/material/styles';

// Design tokens lifted from the Figma "STUDIO.DEV" design system —
// a dark, glassy, high-contrast aesthetic with a single blue accent.
export const tokens = {
  bg: '#050505',
  panel: 'rgba(10, 12, 16, 0.6)',
  panelSolid: '#0a0c10',
  border: 'rgba(255, 255, 255, 0.08)',
  borderSubtle: 'rgba(255, 255, 255, 0.05)',
  accent: '#4a9eff',
  accentSoft: 'rgba(74, 158, 255, 0.1)',
  accentGlow: '0 0 12px rgba(74, 158, 255, 0.4)',
  warn: '#ffb869',
  muted: '#71717a',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: tokens.accent },
    secondary: { main: tokens.warn },
    background: { default: tokens.bg, paper: tokens.panelSolid },
    divider: tokens.borderSubtle,
    text: { primary: '#f4f4f5', secondary: tokens.muted },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Geist, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body1: { fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', lineHeight: 1.6 },
    body2: { fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', lineHeight: 1.6 },
    h1: { fontWeight: 800, letterSpacing: '-0.04em', textTransform: 'uppercase' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700 },
    overline: { fontWeight: 600, letterSpacing: '0.15em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: tokens.bg,
          minWidth: 320,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 9999,
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '0.15em',
          fontSize: '0.7rem',
          padding: '12px 24px',
        },
        contained: {
          boxShadow: `0 0 6px ${tokens.accentSoft}`,
          '&:hover': { boxShadow: '0 0 16px rgba(74, 158, 255, 0.35)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(10, 12, 16, 0.5)',
          border: `1px solid ${tokens.borderSubtle}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
});

export default theme;
