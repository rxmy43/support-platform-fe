import { createBrowserRouter } from 'react-router';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import PostList from '@/pages/PostList';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Hello World</div>,
    },
    {
        element: <PublicRoute />,
        children: [
            {
                path: '/login',
                element: <LoginPage />,
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
            {
                path: '/posts',
                element: <PostList />,
            },
            {
                path: '/return',
                element: <h1>Transaction Success</h1>,
            },
        ],
    },
]);

export default router;
