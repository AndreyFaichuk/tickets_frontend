import { createTheme, darken, lighten } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      dark: darken('#1976d2', 0.2),
      main: '#1976d2',
      light: lighten('#1976d2', 0.2),
      contrastText: '#fff',
    },
    secondary: {
      dark: darken('#9c27b0', 0.2),
      main: '#9c27b0',
      light: lighten('#9c27b0', 0.2),
      contrastText: '#fff',
    },
    error: {
      dark: darken('#f44336', 0.2),
      main: '#f44336',
      light: lighten('#f44336', 0.2),
      contrastText: '#fff',
    },
    warning: {
      dark: darken('#ff9800', 0.2),
      main: '#ff9800',
      light: lighten('#ff9800', 0.2),
      contrastText: '#fff',
    },
    info: {
      dark: darken('#2196f3', 0.2),
      main: '#2196f3',
      light: lighten('#2196f3', 0.2),
      contrastText: '#fff',
    },
    success: {
      dark: darken('#4caf50', 0.2),
      main: '#4caf50',
      light: lighten('#4caf50', 0.2),
      contrastText: '#fff',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
  },
  spacing: 8, // Global spacing multiplier
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px', // consistent padding for buttons
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '8px 0', // consistent margin for text fields
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '16px', // consistent padding for cards
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '16px', // consistent padding for containers
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px', // consistent padding for Paper components
        },
      },
    },
  },
});
