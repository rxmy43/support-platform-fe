import { Eye, DollarSign } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Navbar from '@/components/navbar';
import DashboardHeader from '@/components/header';

export default function DashboardPage() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <DashboardHeader />

            {/* Navbar Section */}
            <Navbar />

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8 space-y-8">
                {/* Data Visualization Section - Balance Card */}
                <section>
                    <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center space-x-2 text-foreground">
                                <DollarSign className="w-6 h-6" />
                                <span>Total Balance</span>
                            </CardTitle>
                            <CardDescription>
                                Total donations received from your supporters
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">
                                {formatCurrency(12500000)}
                            </div>
                            <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                                <Eye className="w-4 h-4" />
                                <span>Only visible to you</span>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </div>
    );
}
