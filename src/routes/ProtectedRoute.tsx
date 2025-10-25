import { useAppStore } from '@/store/useAppStore';
import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute() {
    const user = useAppStore((state) => state.user);

    if (!user) return <Navigate to="/login" replace />;
    return <Outlet />;
}
