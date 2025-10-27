import type {
    IBestSupporters,
    IDonate,
    IFanSpendingHistory,
} from '@/interfaces/support';
import api from '@/lib/api';

export const donate = async (payload: IDonate) => {
    const res = await api.post<{ data: { payment_url: string } }>(
        `/supports`,
        payload
    );
    return res.data.data;
};

export const getFanSpending = async () => {
    const res = await api.get<{ data: number }>(`/supports/fan-spending`);
    return res.data.data;
};

export const getFanSpendingHistory = async (cursor?: number) => {
    const res = await api.get<{
        data: IFanSpendingHistory[];
        next_cursor: number;
    }>(`/supports/fan-spending/history${cursor ? `?cursor${cursor}` : ''}`);
    return res.data;
};

export const getBestSupporters = async (cursor?: number) => {
    const res = await api.get<{
        data: IBestSupporters[];
        next_cursor: number;
    }>(`/supports/best${cursor ? `?cursor=${cursor}` : ''}`);
    return res.data;
};
