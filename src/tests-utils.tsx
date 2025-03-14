import { ReactElement } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

import { theme } from './theme';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export const renderWithProviders = (ui: ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>{ui}</Router>
      </ThemeProvider>
    </QueryClientProvider>,
  );
};
