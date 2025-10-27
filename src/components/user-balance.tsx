import { DollarSign, Eye } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';
import { useCreatorBalance } from '@/hooks/useBalance';
import { useFanSpending } from '@/hooks/useSupport';

type Props = {
    role: 'creator' | 'fan';
};

export default function UserBalance({ role }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const {
        data: creatorBalance,
        isLoading: creatorLoading,
        isError: creatorError,
    } = useCreatorBalance();
    const {
        data: fanSpending,
        isLoading: fanLoading,
        isError: fanError,
    } = useFanSpending();

    return (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-foreground">
                    <DollarSign className="w-6 h-6" />
                    <span>Total Balance</span>
                </CardTitle>
                <CardDescription>
                    {role === 'creator'
                        ? 'Total donations received from your supporters'
                        : "Total amount you've spent supporting creators"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {role === 'creator' ? (
                    <div className="text-3xl font-bold text-foreground">
                        {creatorLoading
                            ? 'Loading...'
                            : creatorError
                            ? 'Error loading balance'
                            : formatCurrency(creatorBalance ?? 0)}
                    </div>
                ) : (
                    <div className="text-3xl font-bold text-foreground">
                        {fanLoading
                            ? 'Loading...'
                            : fanError
                            ? 'Error loading balance'
                            : formatCurrency(fanSpending ?? 0)}
                    </div>
                )}
                <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>Only visible to you</span>
                </div>
            </CardContent>
        </Card>
    );
}
