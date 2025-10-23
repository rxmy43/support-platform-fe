import type { IAppState } from '@/interfaces/app';
import { create } from 'zustand';

export const useAppStore = create<IAppState>((set) => ({
    user: null,
    balance: 0,
    creators: [],
    supports: [],
    setUser: (u) => set({ user: u }),
    clearUser: () => set({ user: null }),
    setBalance: (b) => set({ balance: b }),
    setCreators: (c) => set({ creators: c }),
    setSupports: (s) => set({ supports: s }),
}));
