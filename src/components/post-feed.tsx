import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HeartHandshake } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { usePosts } from '@/hooks/usePost';

function formatTimeAgo(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true });
}

export function PostFeed() {
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        usePosts();

    const toggleExpand = (id: number) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    if (isLoading)
        return <p className="text-center text-muted-foreground">Loading...</p>;

    const posts = data?.pages.flatMap((page) => page.data ?? []) ?? [];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => {
                    const isExpanded = expanded[post.id];
                    const shouldTruncate = post.text.length > 80;
                    const caption =
                        shouldTruncate && !isExpanded
                            ? post.text.slice(0, 80) + '...'
                            : post.text;

                    return (
                        <Card
                            key={post.id}
                            className="relative overflow-hidden border-0 shadow-md aspect-[4/5] group">
                            {/* IMAGE */}
                            <img
                                src={post.media_url}
                                alt="post"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* DARK OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                            {/* HEADER */}
                            <CardHeader className="absolute top-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-b from-black/70 to-transparent p-3 z-10">
                                <Avatar className="w-9 h-9 ring-2 ring-white/30">
                                    <AvatarImage
                                        src="https://testingbot.com/free-online-tools/random-avatar/300?img=1"
                                        alt={post.creator_name}
                                    />
                                    <AvatarFallback>
                                        {post.creator_name}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-white font-semibold text-sm">
                                        {post.creator_name}
                                    </p>
                                    <p className="text-xs text-white/70">
                                        {formatTimeAgo(
                                            new Date(post.published_at)
                                        )}
                                    </p>
                                </div>
                            </CardHeader>

                            {/* CAPTION + BUTTON */}
                            <CardContent className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm text-white leading-relaxed flex-1">
                                        {caption}
                                        {shouldTruncate && (
                                            <button
                                                className="ml-1 text-blue-300 text-xs hover:underline font-medium"
                                                onClick={() =>
                                                    toggleExpand(post.id)
                                                }>
                                                {isExpanded
                                                    ? 'Show less'
                                                    : 'Show more'}
                                            </button>
                                        )}
                                    </p>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="rounded-full bg-white/90 hover:bg-white shadow-md backdrop-blur-sm ml-2 flex-shrink-0">
                                        <HeartHandshake className="w-4 h-4 text-pink-600" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {hasNextPage && (
                <div className="flex justify-center">
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}>
                        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                    </Button>
                </div>
            )}
        </div>
    );
}
