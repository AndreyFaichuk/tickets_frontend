import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from '../../theme';
import { useAuth } from './hooks/useAuth';
import { lazy, Suspense } from 'react';
import { DefaultCircularLoader } from '../shared/DefaultCircularLoader/DefaultCircularLoader';

const LazyLoggedInAppLayout = lazy(
  () => import('./components/LoggedInAppLayout/LoggedInAppLayout'),
);
const LazyPublicAppLayout = lazy(
  () => import('./components/PublicAppLayout/PublicAppLayout'),
);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const App = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <LazyLoggedInAppLayout /> : <LazyPublicAppLayout />;
};

export const AppProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Suspense fallback={<DefaultCircularLoader />}>
            <App />
          </Suspense>
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
