import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8b5cf6' },
    secondary: { main: '#22d3ee' },
    background: { default: '#09090f', paper: '#13131d' },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.045em' },
    h2: { fontWeight: 750, letterSpacing: '-0.03em' },
    h3: { fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'radial-gradient(circle at 50% -20%, #292054 0%, #09090f 52%, #09090f 100%)',
          minWidth: 320,
        },
      },
    },
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
  },
});

export default theme;
