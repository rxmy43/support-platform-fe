export interface ICreatePostPayload {
    file: File | null;
    text: string;
}

export interface IPost {
    id: number;
    creator_id: number;
    creator_name: string;
    text: string;
    media_url: string;
    published_at: string;
}
