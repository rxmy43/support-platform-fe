import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function useWebsocket(
    creatorId: number,
    onMessage: (data: any) => void
) {
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!creatorId) return;

        let apiUrl = import.meta.env.VITE_API_URL.replace(/\/api$/, '');
        const ws = new WebSocket(`wss://${apiUrl}/ws?creator_id=${creatorId}`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('ws open');
        };

        ws.onmessage = (ev) => {
            try {
                const json = JSON.parse(ev.data);
                const audio = new Audio('/sound/notification.wav');
                audio.play();

                toast.success(
                    `${json.fan_name} just sent you IDR ${Number(
                        json.amount
                    ).toLocaleString()}`,
                    {
                        duration: 5000,
                    }
                );
                onMessage(json);
            } catch (error) {
                console.error(error);
            }
        };

        ws.onclose = () => console.log('ws closed');
        ws.onerror = (e) => console.error('ws error', e);

        return () => {
            ws.close();
        };
    }, [creatorId, onMessage]);
}
