import api from '@/lib/api';

export const getCreatorBalance = async () => {
    const res = await api.get<{ data: number }>(`/balances/creator`);
    return res.data.data;
};
