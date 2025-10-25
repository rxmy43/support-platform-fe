import { useAppStore } from '@/store/useAppStore';
import { Navigate, Outlet } from 'react-router';

export default function PublicRoute() {
    const user = useAppStore((state) => state.user);
    if (user) return <Navigate to="/dashboard" replace />;
    return <Outlet />;
}
