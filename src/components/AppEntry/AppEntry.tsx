import { lazy, Suspense } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import { theme } from '../../theme';
import { DefaultCircularLoader } from '../shared/DefaultCircularLoader/DefaultCircularLoader';

import { useAuth } from './hooks/useAuth';

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
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <DefaultCircularLoader />;
  }

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
