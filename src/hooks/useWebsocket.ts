import { useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';

export function useWebsocket(
    creatorId: number,
    onMessage: (data: any) => void
) {
    const wsRef = useRef<WebSocket | null>(null);

    const stableOnMessage = useCallback(onMessage, [onMessage]);

    useEffect(() => {
        if (!creatorId) return;

        let apiUrl = import.meta.env.VITE_API_URL.replace(/\/api$/, '');
        const ws = new WebSocket(`wss://${apiUrl}/ws?creator_id=${creatorId}`);
        wsRef.current = ws;

        ws.onopen = () => console.log('ws open');

        ws.onmessage = (ev) => {
            try {
                const msg = JSON.parse(ev.data);
                if (msg.event === 'support_received') {
                    const data = msg.data;
                    new Audio('/sound/notification.wav').play();
                    toast.success(
                        `${data.fan_name} just sent you IDR ${Number(
                            data.amount
                        ).toLocaleString()}`,
                        { duration: 5000 }
                    );
                    stableOnMessage(data);
                }
                // add another event
            } catch (e) {
                console.error(e);
            }
        };

        ws.onclose = () => console.log('ws closed');
        ws.onerror = (e) => console.error('ws error', e);

        return () => {
            wsRef.current = null;
            ws.close();
        };
    }, [creatorId, stableOnMessage]);
}
