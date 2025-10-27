export interface IDonate {
    amount: number;
    creator_id: number;
}

export interface IBestSupporters {
    amount: number;
    fan_name: string;
    sent_at: string;
}

export interface IFanSpendingHistory {
    amount: number;
    creator_name: string;
    sent_at: string;
}
