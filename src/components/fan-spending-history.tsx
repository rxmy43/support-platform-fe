import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { useFanSpendingHistory } from '@/hooks/useSupport';

export default function FanSpendingHistory() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useFanSpendingHistory();

    const spendingHistory = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full mb-8">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-green-600" />
                        <span>Your Spending History</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                    {isLoading ? (
                        <div className="text-muted-foreground text-center py-6">
                            Loading your spending history...
                        </div>
                    ) : spendingHistory.length === 0 ? (
                        <div className="text-muted-foreground text-center py-6">
                            You haven’t supported anyone yet.
                        </div>
                    ) : (
                        spendingHistory.map((s, i) => (
                            <motion.div
                                key={`${s.creator_name}-${i}`}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center justify-between p-3 rounded-xl bg-background/50 hover:bg-primary/5 transition-colors border border-border">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage
                                            src={`https://testingbot.com/free-online-tools/random-avatar/300?img=${
                                                i + 10
                                            }`}
                                        />
                                        <AvatarFallback>
                                            {s.creator_name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-foreground">
                                            {s.creator_name}
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
                                <div className="font-semibold text-green-600">
                                    Rp {s.amount.toLocaleString('id-ID')}
                                </div>
                            </motion.div>
                        ))
                    )}

                    {hasNextPage && (
                        <div className="flex justify-center mt-6">
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
