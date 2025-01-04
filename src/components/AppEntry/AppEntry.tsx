import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from '../../theme';
import { LoggedInAppLayout } from './components/LoggedInAppLayout';
import { PublicAppLayout } from './components/PublicAppLayout';
import { useAuth } from './hooks/useAuth';

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <LoggedInAppLayout /> : <PublicAppLayout />;
};

export const AppProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <App />
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
