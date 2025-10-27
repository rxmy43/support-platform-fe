import Navbar from '@/components/navbar';
import DashboardHeader from '@/components/header';
import BestSupporters from '@/components/best-supporters';
import Footer from '@/components/footer';
import { useAppStore } from '@/store/useAppStore';
import UserBalance from '@/components/user-balance';
import FanSpendingHistory from '@/components/fan-spending-history';

export default function DashboardPage() {
    const user = useAppStore((s) => s.user);

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
                    <UserBalance role={user?.role!} />
                </section>

                {/* List of Best Supporters */}
                <section>
                    {user?.role === 'creator' ? (
                        <BestSupporters />
                    ) : (
                        <FanSpendingHistory />
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
