import type { ICreatePostPayload } from '@/interfaces/post';
import api from '@/lib/api';

export const createPost = async (payload: ICreatePostPayload) => {
    const formData = new FormData();
    formData.append('creator_id', payload.creator_id);
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
