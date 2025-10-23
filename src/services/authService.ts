import type { IUser } from '@/interfaces/user';
import api from '@/lib/api';

export const sendOTP = async (phone: string) => {
    const res = await api.post<{ data: string }>('/auth/generate-otp', {
        phone,
    });
    return res.data.data;
};

export const verifyOTP = async (phone: string, otp: string) => {
    const res = await api.post<{ data: IUser }>('/auth/verify-otp', {
        phone,
        otp,
    });
    return res.data.data;
};
