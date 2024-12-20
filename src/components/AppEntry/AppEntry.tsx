import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { DefaultAppLayout } from '../../app/DefaultAppLayout';
import { APP_ROUTES } from '../../constants/routes';
import { TodosPage } from '../../pages/TodosPage';
import { theme } from '../../theme'

const App = () => {
  return (
    <DefaultAppLayout>
      <Routes>
        <Route path={APP_ROUTES.TODOS} element={<TodosPage />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.TODOS} />} />
      </Routes>
    </DefaultAppLayout>
  );
};

export const AppProvider = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </ThemeProvider>
  );
};