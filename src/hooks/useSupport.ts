import type { IDonate } from '@/interfaces/support';
import { donate } from '@/services/supportService';
import { useMutation } from '@tanstack/react-query';

export function useDonate() {
    return useMutation({
        mutationFn: (payload: IDonate) => donate(payload),
    });
}
