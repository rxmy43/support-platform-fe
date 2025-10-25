import type { IAppState } from '@/interfaces/app';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
    persist<IAppState>(
        (set) => ({
            user: null,
            balance: 0,
            creators: [],
            supports: [],
            setUser: (u) => set({ user: u }),
            clearUser: () => set({ user: null }),
            setBalance: (b) => set({ balance: b }),
            setCreators: (c) => set({ creators: c }),
            setSupports: (s) => set({ supports: s }),
        }),
        { name: 'app-storage' }
    )
);
