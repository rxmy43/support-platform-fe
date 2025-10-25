import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HeartHandshake } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Creator {
    name: string;
    avatar: string;
}

interface Post {
    id: number;
    creator: Creator;
    image: string;
    caption: string;
    createdAt: Date;
}

const dummyPosts: Post[] = [
    {
        id: 1,
        creator: { name: 'RinaArt', avatar: 'https://i.pravatar.cc/150?img=3' },
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900',
        caption:
            'Terima kasih sudah mendukung karya ini 💖 Aku benar-benar menghargai semua support kalian yang bikin aku terus semangat berkarya!',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    {
        id: 2,
        creator: {
            name: 'SketchMaster',
            avatar: 'https://i.pravatar.cc/150?img=8',
        },
        image: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=900',
        caption:
            'Sebuah sketsa cepat dari pagi yang sibuk. Kadang hal sederhana bisa terlihat indah kalau dilihat dengan hati yang tenang 🎨.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
        id: 3,
        creator: {
            name: 'PixelGuru',
            avatar: 'https://i.pravatar.cc/150?img=12',
        },
        image: 'https://images.unsplash.com/photo-1601758123927-1975a2b3b06e?w=900',
        caption:
            'Eksperimen kecil dengan warna neon dan cahaya buatan. Lumayan sih, tapi gue pengen tahu opini kalian. Keren atau norak? 😂',
        createdAt: new Date(Date.now() - 1000 * 60 * 10),
    },
];

function formatTimeAgo(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true });
}

export function PostFeed() {
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});

    const toggleExpand = (id: number) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyPosts.map((post) => {
                const isExpanded = expanded[post.id];
                const shouldTruncate = post.caption.length > 80;
                const caption =
                    shouldTruncate && !isExpanded
                        ? post.caption.slice(0, 80) + '...'
                        : post.caption;

                return (
                    <Card
                        key={post.id}
                        className="relative overflow-hidden border-0 shadow-md aspect-[4/5] group">
                        {/* IMAGE */}
                        <img
                            src={post.image}
                            alt="post"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* DARK OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                        {/* HEADER */}
                        <CardHeader className="absolute top-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-b from-black/70 to-transparent p-3 z-10">
                            <Avatar className="w-9 h-9 ring-2 ring-white/30">
                                <AvatarImage
                                    src={post.creator.avatar}
                                    alt={post.creator.name}
                                />
                                <AvatarFallback>
                                    {post.creator.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-white font-semibold text-sm">
                                    {post.creator.name}
                                </p>
                                <p className="text-xs text-white/70">
                                    {formatTimeAgo(post.createdAt)}
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
    );
}
