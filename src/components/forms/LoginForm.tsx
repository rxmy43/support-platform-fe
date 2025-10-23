import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Phone, RefreshCw, Send, ArrowLeft } from 'lucide-react';
import { Input } from '../ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { useSendOTP, useVerifyOTP } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Zod validation schemas
const phoneSchema = z.object({
    phone: z
        .string()
        .min(9, 'Phone number must have at least 9 digits')
        .max(12, 'Phone number must have at most 12 digits')
        .regex(/^8\d+$/, 'Phone number must start with 8 (e.g., 812xxxxxxx)'),
});

const otpSchema = z.object({
    otp: z.string().length(6, 'OTP must be 6 digits'),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;
type OTPFormValues = z.infer<typeof otpSchema>;

const IndonesiaFlag = ({ className = 'w-5 h-3.5' }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 30 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="10" y="0" fill="#E70011" />
        <rect width="30" height="10" y="10" fill="#FFFFFF" />
    </svg>
);

export default function LoginForm() {
    const [countDown, setCountDown] = useState(0);
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [submittedPhone, setSubmittedPhone] = useState('');
    const [otpValue, setOtpValue] = useState('');

    const phoneForm = useForm<PhoneFormValues>({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phone: '',
        },
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const otpForm = useForm<OTPFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    });

    useEffect(() => {
        if (countDown > 0) {
            const timer = setTimeout(() => setCountDown(countDown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countDown]);

    const sendOTP = useSendOTP();
    const verifyOTP = useVerifyOTP();

    const onSendOTP = async (payload: PhoneFormValues) => {
        let formattedPhone = payload.phone.trim();
        if (formattedPhone.startsWith('0')) {
            formattedPhone = formattedPhone.slice(1);
        }

        const fullPhone = `+62${formattedPhone}`;

        sendOTP.mutate(fullPhone, {
            onSuccess: (data) => {
                console.log(`otp for ${fullPhone} is ${data}`);
                toast.success('OTP has been sent');

                setCountDown(60);
                setIsOTPSent(true);
                setSubmittedPhone(fullPhone);
            },
            onError: (err: any) => {
                console.error(err);
                toast.error('failed to send otp');
            },
        });
    };

    const onVerifyOTP = (data: OTPFormValues) => {
        verifyOTP.mutate(
            { phone: submittedPhone, otp: data.otp },
            {
                onSuccess: () => {
                    toast.success('Login success');
                },
                onError: () => {
                    toast.error('login error');
                },
            }
        );
    };

    const handleResendOTP = () => {
        if (countDown > 0) return;

        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(`Resent OTP for ${submittedPhone}: ${otp}`);

        setCountDown(60);
        console.log('OTP resent successfully!');
    };

    const handleBackToPhone = () => {
        setIsOTPSent(false);
        setOtpValue('');
        otpForm.reset();
    };

    // Mask phone number for display (show country code and last 3 digits)
    const maskPhoneNumber = (phone: string) => {
        if (phone.length <= 3) return phone;
        const visibleDigits = 3;
        const maskedPart = '*'.repeat(phone.length - visibleDigits);
        const lastDigits = phone.slice(-visibleDigits);
        return `+62 ${maskedPart}${lastDigits}`;
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-8 p-6 bg-card rounded-lg border border-border shadow-sm">
            <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">
                    Login with Phone
                </h1>
                <p className="text-sm text-muted-foreground">
                    {isOTPSent
                        ? `We've sent a 6-digit code to ${maskPhoneNumber(
                              submittedPhone
                          )}`
                        : 'Enter your phone number to receive an OTP code'}
                </p>
            </div>

            {!isOTPSent ? (
                // Phone Input Stage
                <form
                    onSubmit={phoneForm.handleSubmit(onSendOTP)}
                    className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="phone"
                            className="text-sm font-medium text-foreground">
                            Phone Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                                <IndonesiaFlag className="w-5 h-3.5 rounded-sm shadow-sm" />
                                <span className="text-sm text-muted-foreground font-medium ml-2">
                                    +62
                                </span>
                            </div>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="812 3456 7890"
                                className="pl-20"
                                {...phoneForm.register('phone', {
                                    onChange: (e) => {
                                        e.target.value = e.target.value.replace(
                                            /[^0-9]/g,
                                            ''
                                        );
                                    },
                                })}
                            />
                        </div>
                        {phoneForm.formState.errors.phone &&
                            phoneForm.getValues('phone') !== '' && (
                                <p className="text-sm text-destructive">
                                    {phoneForm.formState.errors.phone.message}
                                </p>
                            )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!phoneForm.formState.isValid}>
                        <Send className="w-4 h-4 mr-2" />
                        Send OTP Code
                    </Button>
                </form>
            ) : (
                // OTP Input Stage
                <div className="space-y-6">
                    <form
                        onSubmit={otpForm.handleSubmit(onVerifyOTP)}
                        className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Enter 6-digit code
                            </label>
                            <InputOTP
                                maxLength={6}
                                value={otpValue}
                                onChange={(value) => {
                                    setOtpValue(value);
                                    otpForm.setValue('otp', value);
                                }}>
                                <InputOTPGroup className="w-full justify-between">
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <InputOTPSlot
                                            key={index}
                                            index={index}
                                            className="w-12 h-12 text-lg border-border"
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                            {otpForm.formState.errors.otp && (
                                <p className="text-sm text-destructive">
                                    {otpForm.formState.errors.otp.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={otpValue.length !== 6}>
                            Verify OTP
                        </Button>
                    </form>

                    <div className="text-center space-y-3">
                        <Button
                            variant="link"
                            className={`p-0 h-auto font-normal ${
                                countDown > 0
                                    ? 'text-muted-foreground hover:text-muted-foreground'
                                    : 'text-primary'
                            }`}
                            onClick={handleResendOTP}
                            disabled={countDown > 0}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            {countDown > 0
                                ? `Resend code in ${countDown}s`
                                : 'Resend code'}
                        </Button>

                        <div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground"
                                onClick={handleBackToPhone}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Change phone number
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-4 border-t border-border">
                <p className="text-xs text-center text-muted-foreground">
                    By continuing, you agree to our Terms of Service and Privacy
                    Policy
                </p>
            </div>
        </div>
    );
}
