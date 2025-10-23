import type { IUser } from './user';

export interface IAppState {
    user: IUser | null;
    balance: number;
    creators: IUser[];
    supports: any[];
    setUser: (u: IUser) => void;
    clearUser: () => void;
    setBalance: (b: number) => void;
    setCreators: (c: IUser[]) => void;
    setSupports: (s: any[]) => void;
}
