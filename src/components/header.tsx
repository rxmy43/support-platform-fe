import { Bell, LogOut, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useNavigate } from 'react-router';
import { useAppStore } from '@/store/useAppStore';
import { useCallback, useState } from 'react';
import { useWebsocket } from '@/hooks/useWebsocket';

export default function DashboardHeader() {
    const navigate = useNavigate();
    const { clearUser } = useAppStore();
    const user = useAppStore((state) => state.user);

    const [notifications, setNotifications] = useState<any[]>([]);
    const [hasNewNotif, setHasNewNotif] = useState(false);

    const handleLogout = () => {
        clearUser();
        navigate('/login', { replace: true });
    };

    const capitalize = (text: string): string =>
        text.charAt(0).toUpperCase() + text.slice(1);

    const handleMessage = useCallback((data: any) => {
        setNotifications((prev) => [data, ...prev]);
        setHasNewNotif(true);
    }, []);

    useWebsocket(user?.role === 'creator' ? user?.id : 0, handleMessage);
    return (
        <header className="border-b border-border bg-background">
            <div className="flex items-center justify-between px-6 py-4">
                {/* App Title */}
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h1 className="text-xl font-bold text-foreground">
                        Support Platform
                    </h1>
                </div>

                {/* User Profile with Dropdown */}
                <div className="flex items-center space-x-3">
                    {/* Notification Bell */}
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative"
                                onClick={() => setHasNewNotif(false)}>
                                <Bell className="w-5 h-5" />
                                {hasNewNotif && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-72 p-2 space-y-2">
                            {notifications.length === 0 ? (
                                <div className="text-sm text-muted-foreground text-center py-2">
                                    No notifications yet
                                </div>
                            ) : (
                                notifications.map((n, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col border-b border-border last:border-none pb-2">
                                        <span className="text-sm font-semibold text-foreground">
                                            💰 {n.fan_name} donated Rp
                                            {Number(n.amount).toLocaleString()}
                                        </span>
                                        {n.message && (
                                            <span className="text-xs text-muted-foreground">
                                                “{n.message}”
                                            </span>
                                        )}
                                    </div>
                                ))
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Avatar with Dropdown */}
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                            <div className="flex items-center">
                                <img
                                    src={
                                        'https://testingbot.com/free-online-tools/random-avatar/300?img=1'
                                    }
                                    alt="User avatar"
                                    className="rounded-full w-8 h-8 border-2 border-border hover:border-primary/50 transition-colors"
                                />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 p-3" align="end">
                            {/* User Info Section */}
                            <div className="flex items-center space-x-3 px-2 py-3">
                                <img
                                    src={
                                        'https://testingbot.com/free-online-tools/random-avatar/300?img=1'
                                    }
                                    alt={user?.name}
                                    className="rounded-full w-10 h-10 border border-border"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-foreground">
                                        {user?.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {capitalize(user?.role ?? '')} Account
                                    </span>
                                </div>
                            </div>

                            <DropdownMenuSeparator className="my-2" />

                            {/* Logout Option */}
                            <DropdownMenuItem
                                className="flex items-center space-x-2 text-destructive focus:text-destructive cursor-pointer px-2 py-2"
                                onClick={handleLogout}>
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
