export type Role = 'fan' | 'creator';

export interface IUser {
    id: number;
    name: string;
    phone: string;
    role: Role;
}
