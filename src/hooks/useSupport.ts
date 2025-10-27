import type { IDonate } from '@/interfaces/support';
import {
    donate,
    getBestSupporters,
    getFanSpending,
    getFanSpendingHistory,
} from '@/services/supportService';
import { useAppStore } from '@/store/useAppStore';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

export function useDonate() {
    return useMutation({
        mutationFn: (payload: IDonate) => donate(payload),
    });
}

export function useFanSpending() {
    const user = useAppStore((s) => s.user);
    return useQuery({
        queryKey: ['fanSpending'],
        queryFn: () => getFanSpending(),
        staleTime: 1000 * 60 * 2,
        enabled: user?.role === 'fan',
    });
}

export function useFanSpendingHistory() {
    const user = useAppStore((s) => s.user);
    return useInfiniteQuery({
        queryKey: ['fanSpendingHistory'],
        queryFn: ({ pageParam = 0 }) => getFanSpendingHistory(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
        staleTime: 1000 * 60 * 2,
        enabled: user?.role === 'fan',
    });
}

export function useBestSupporters() {
    const user = useAppStore((s) => s.user);
    return useInfiniteQuery({
        queryKey: ['bestSupporters'],
        queryFn: ({ pageParam = 0 }) => getBestSupporters(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
        staleTime: 1000 * 60 * 2,
        enabled: user?.role === 'creator',
    });
}
