import UploadPostForm from '@/components/forms/upload-post-form';
import DashboardHeader from '@/components/header';
import Navbar from '@/components/navbar';
import { PostFeed } from '@/components/post-feed';
import { useAppStore } from '@/store/useAppStore';

export default function PostList() {
    const user = useAppStore((s) => s.user);
    const isCreator = user?.role === 'creator';

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <DashboardHeader />
            {/* Navbar */}
            <Navbar />

            {/* Main */}
            <main className="flex-1 container mx-auto px-6 py-8 space-y-8">
                {isCreator ? (
                    // === CREATOR MODE ===
                    <>
                        {/* Upload Form on Top */}
                        <section className="w-full">
                            <UploadPostForm />
                        </section>

                        {/* Post List Below */}
                        <section className="space-y-6">
                            <PostFeed />
                        </section>
                    </>
                ) : (
                    // === FAN MODE ===
                    <section className="space-y-6">
                        <PostFeed />
                    </section>
                )}
            </main>
        </div>
    );
}
