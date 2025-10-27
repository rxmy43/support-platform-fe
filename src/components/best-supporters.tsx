import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import { useBestSupporters } from '@/hooks/useSupport';

export default function BestSupporters() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useBestSupporters();

    const supporters = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full mb-8">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-3">
                        <HeartHandshake className="w-8 h-8 text-pink-600" />
                        <span>Your Best Supporters</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                    {supporters.length === 0 ? (
                        <p className="text-muted-foreground text-sm text-center py-6">
                            No supporters yet.
                        </p>
                    ) : (
                        supporters.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center justify-between p-3 rounded-xl bg-background/50 hover:bg-primary/5 transition-colors border border-border">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage
                                            src={`https://testingbot.com/free-online-tools/random-avatar/300?img=${
                                                i + 1
                                            }`}
                                        />
                                        <AvatarFallback>
                                            {s.fan_name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-foreground">
                                            {s.fan_name}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(s.sent_at).toLocaleString(
                                                'id-ID',
                                                {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short',
                                                }
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="font-semibold text-primary">
                                    Rp {s.amount.toLocaleString('id-ID')}
                                </div>
                            </motion.div>
                        ))
                    )}

                    {hasNextPage && (
                        <div className="flex justify-center pt-4">
                            <Button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                className="rounded-xl"
                                variant="outline">
                                {isFetchingNextPage
                                    ? 'Loading...'
                                    : 'Load More'}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
