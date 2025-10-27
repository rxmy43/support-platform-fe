import { useAppStore } from '@/store/useAppStore';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';

export function useWebsocket(
    creatorId: number,
    onMessage: (data: any) => void
) {
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<number | null>(null);
    const queryClient = useQueryClient();
    const user = useAppStore((s) => s.user);

    const stableOnMessage = useCallback(onMessage, [onMessage]);

    useEffect(() => {
        if (!creatorId) return;

        const connect = () => {
            try {
                const wsUrl = import.meta.env.VITE_WS_URL;
                // Ensure URL has proper protocol
                const url =
                    wsUrl.startsWith('ws://') || wsUrl.startsWith('wss://')
                        ? `${wsUrl}?creator_id=${creatorId}`
                        : `ws://${wsUrl}?creator_id=${creatorId}`;

                const ws = new WebSocket(url);
                wsRef.current = ws;

                ws.onopen = () => {
                    console.log(
                        'WebSocket connected for creator_id:',
                        creatorId
                    );
                };

                ws.onmessage = (ev) => {
                    try {
                        const msg = JSON.parse(ev.data);
                        console.log('WebSocket message received:', msg);

                        if (msg.event === 'support_received') {
                            const data = msg.data;
                            // Play sound and show toast
                            new Audio('/sound/notification.wav')
                                .play()
                                .catch((e) => {
                                    console.warn(
                                        'Could not play notification sound:',
                                        e
                                    );
                                });
                            toast.success(
                                `${data.fan_name} just sent you IDR ${Number(
                                    data.amount
                                ).toLocaleString()}`,
                                { duration: 5000 }
                            );

                            if (user?.role === 'creator') {
                                queryClient.invalidateQueries({
                                    queryKey: ['bestSupporters'],
                                });
                                queryClient.invalidateQueries({
                                    queryKey: ['creatorBalance'],
                                });
                            } else if (user?.role === 'fan') {
                                queryClient.invalidateQueries({
                                    queryKey: ['fanSpending'],
                                });
                                queryClient.invalidateQueries({
                                    queryKey: ['fanSpendingHistory'],
                                });
                            }

                            stableOnMessage(data);
                        }
                        // Add handling for other events here
                    } catch (e) {
                        console.error('Error parsing WebSocket message:', e);
                    }
                };

                ws.onclose = (event) => {
                    console.log('WebSocket closed:', event.code, event.reason);

                    // Attempt reconnect after delay if not a normal closure
                    if (event.code !== 1000) {
                        console.log('Attempting to reconnect in 3 seconds...');
                        reconnectTimeoutRef.current = window.setTimeout(() => {
                            connect();
                        }, 3000);
                    }
                };

                ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };
            } catch (error) {
                console.error('WebSocket connection failed:', error);
            }
        };

        connect();

        return () => {
            // Clear any pending reconnection attempts
            if (reconnectTimeoutRef.current !== null) {
                window.clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }

            // Close WebSocket connection properly
            if (wsRef.current) {
                wsRef.current.onclose = null; // Remove onclose handler to prevent reconnect
                wsRef.current.close(1000, 'Component unmounted');
                wsRef.current = null;
            }
        };
    }, [creatorId, stableOnMessage]);
}
