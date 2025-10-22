import { createBrowserRouter } from 'react-router';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Hello World</div>,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/dashboard',
        element: <DashboardPage />,
    },
]);

export default router;
