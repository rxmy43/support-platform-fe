import { NavLink } from 'react-router';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

export default function Navbar() {
    const user = useAppStore((state) => state.user);

    const navItems = [
        { label: 'Overview', path: '/dashboard' },
        {
            label: user?.role == 'fan' ? 'Creators' : 'My Posts',
            path: '/posts',
        },
    ];

    return (
        <nav className="border-b border-border bg-background">
            <div className="flex space-x-8 px-6">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                'px-3 py-2 text-sm font-medium border-b-2 transition-colors hover:bg-transparent',
                                isActive
                                    ? 'border-foreground text-foreground'
                                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/50'
                            )
                        }>
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
