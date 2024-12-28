import { createRoot } from 'react-dom/client';
import { AppProvider } from './components/AppEntry';

createRoot(document.getElementById('root')!).render(<AppProvider />);
