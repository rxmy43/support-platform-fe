import { sendOTP, verifyOTP } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';

export function useSendOTP() {
    return useMutation({
        mutationFn: (phone: string) => sendOTP(phone),
    });
}

export function useVerifyOTP() {
    return useMutation({
        mutationFn: ({ phone, otp }: { phone: string; otp: string }) =>
            verifyOTP(phone, otp),
    });
}
