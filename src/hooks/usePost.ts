import type { ICreatePostPayload } from '@/interfaces/post';
import {
    createPost,
    fetchAllPosts,
    generateAICaption,
} from '@/services/postService';
import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

export function usePosts() {
    return useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 0 }) => fetchAllPosts(pageParam),
        getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
        initialPageParam: 0,
        staleTime: 1000 * 60 * 2,
    });
}

export function useCreatePost() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: ICreatePostPayload) => createPost(payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['posts'] });
        },
    });
}

export function useGenerateAICaption() {
    return useMutation({
        mutationFn: (tone?: string) => generateAICaption(tone),
    });
}
