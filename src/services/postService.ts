import type { ICreatePostPayload, IPost } from '@/interfaces/post';
import api from '@/lib/api';

export const createPost = async (payload: ICreatePostPayload) => {
    const formData = new FormData();
    formData.append('file', payload.file!);
    formData.append('text', payload.text);

    const res = await api.post<{ message: string }>(`/posts`, formData);
    return res.data.message;
};

export const generateAICaption = async (tone?: string) => {
    const res = await api.post<{ data: { caption: string } }>(
        `/posts/ai-caption`,
        { tone: tone ?? '' }
    );
    return res.data.data.caption;
};

export const fetchAllPosts = async (cursor?: number) => {
    const res = await api.get<{ data: IPost[]; next_cursor?: number }>(
        `/posts/${cursor ? `?cursor=${cursor}` : ''}`
    );
    return res.data;
};
