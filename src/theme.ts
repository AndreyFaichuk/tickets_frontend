import {
  createTheme,
  darken,
  lighten,
  Theme,
  Palette,
} from '@mui/material/styles';

export interface MyPalette extends Palette {
  progress: {
    notStarted: string;
    justStarted: string;
    almostMiddle: string;
    afterMiddle: string;
    almostFinish: string;
    done: string;
  };
  card: {
    light: string;
    medium: string;
    dark: string;
  };
}

export interface MyTheme extends Theme {
  palette: MyPalette;
}

const baseTheme = createTheme({
  palette: {
    primary: {
      dark: darken('#7aa362', 0.2),
      main: '#7aa362',
      light: lighten('#7aa362', 0.2),
    },
    secondary: {
      dark: darken('#acc2b2', 0.1),
      main: '#acc2b2',
      light: lighten('#acc2b2', 0.4),
    },
    warning: {
      dark: darken('#fa695f', 0.2),
      main: '#fa695f',
      light: lighten('#fa695f', 0.2),
    },
    grey: {
      50: '#f9f9f9',
      100: '#f0f0f0',
      200: '#e0e0e0',
      300: '#d0d0d0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontSize: '1.125rem',
      lineHeight: '1.2',
      fontWeight: 500,
    },
    body2: {
      color: '#616161',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '8px 0',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: lighten('#acc2b2', 0.8),
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '8px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '8px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '8px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: lighten('#acc2b2', 0.7),
        },
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '*': {
          scrollbarWidth: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          position: 'unset',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 'unset',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        subtitle2: {
          fontSize: '0.75rem',
        },
      },
    },
  },
});

export const theme: MyTheme = {
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    progress: {
      notStarted: '#cf1002',
      justStarted: '#fa643e',
      almostMiddle: '#eb8b1e',
      afterMiddle: '#f7d305',
      almostFinish: '#a2fa3e',
      done: '#047d00',
    },
    card: {
      light: lighten('#AEC09A', 0.2),
      medium: '#AEC09A',
      dark: darken('#AEC09A', 0.2),
    },
  },
};
