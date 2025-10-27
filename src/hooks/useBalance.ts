import { getCreatorBalance } from '@/services/balanceService';
import { useAppStore } from '@/store/useAppStore';
import { useQuery } from '@tanstack/react-query';

export function useCreatorBalance() {
    const user = useAppStore((s) => s.user);
    return useQuery({
        queryKey: ['creatorBalance'],
        queryFn: () => getCreatorBalance(),
        staleTime: 1000 * 60 * 2,
        enabled: user?.role === 'creator',
    });
}
