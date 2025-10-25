import type { ICreatePostPayload } from '@/interfaces/post';
import { createPost, generateAICaption } from '@/services/postService';
import { useMutation } from '@tanstack/react-query';

export function useCreatePost() {
    return useMutation({
        mutationFn: (payload: ICreatePostPayload) => createPost(payload),
    });
}

export function useGenerateAICaption() {
    return useMutation({
        mutationFn: (tone?: string) => generateAICaption(tone),
    });
}
