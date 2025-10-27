import type { IDonate } from '@/interfaces/support';
import api from '@/lib/api';

export const donate = async (payload: IDonate) => {
    const res = await api.post<{ data: { payment_url: string } }>(
        `/supports`,
        payload
    );
    return res.data.data;
};
