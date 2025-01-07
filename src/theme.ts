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
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontSize: '1.125rem',
      lineHeight: '1.2',
      fontWeight: 500,
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
          overflowY: 'hidden',
          backgroundColor: lighten('#acc2b2', 0.7),
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
