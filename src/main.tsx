import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/theme-provider.tsx';
import router from './router.tsx';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <RouterProvider router={router} />
                <Toaster
                    theme="system"
                    closeButton
                    duration={2000}
                    position="top-right"
                />
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);
