// pages/DashboardPage.tsx
import { useState } from 'react';
import {
    Bell,
    LogOut,
    User,
    Upload,
    Sparkles,
    Eye,
    DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/navbar';

export default function DashboardPage() {
    const [postContent, setPostContent] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Dummy data
    const userData = {
        name: 'John Doe',
        avatar: `https://testingbot.com/free-online-tools/random-avatar/300?img=1`,
        balance: 1250000,
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleAIGenerate = () => {
        // Simulate AI caption generation
        const aiCaption =
            '🎨 Just created this amazing piece! Thank you all for your incredible support! 💫 #Art #Creativity';
        setPostContent(aiCaption);
    };

    const handleLogout = () => {
        console.log('Logging out...');
    };

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
            <header className="border-b border-border bg-background">
                <div className="flex items-center justify-between px-6 py-4">
                    {/* App Title */}
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <h1 className="text-xl font-bold text-foreground">
                            Support Platform
                        </h1>
                    </div>

                    {/* User Profile with Dropdown */}
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
                        </Button>

                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger
                                asChild
                                className="cursor-pointer">
                                <img
                                    src={userData.avatar}
                                    alt={userData.name}
                                    className="rounded-full w-8 h-8"
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                                    <User className="w-4 h-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center space-x-2 text-destructive focus:text-destructive cursor-pointer"
                                    onClick={handleLogout}>
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

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
                                {formatCurrency(userData.balance)}
                            </div>
                            <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                                <Eye className="w-4 h-4" />
                                <span>Only visible to you</span>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Upload Post Section */}
                <section>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Upload className="w-5 h-5" />
                                <span>Create New Post</span>
                            </CardTitle>
                            <CardDescription>
                                Share updates with your supporters
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Image Upload */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-foreground">
                                    Upload Image
                                </label>
                                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="cursor-pointer flex flex-col items-center space-y-2">
                                        <Upload className="w-8 h-8 text-muted-foreground" />
                                        <div>
                                            <span className="text-sm font-medium text-primary">
                                                Click to upload
                                            </span>
                                            <p className="text-xs text-muted-foreground">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </label>
                                </div>
                                {selectedImage && (
                                    <p className="text-sm text-muted-foreground">
                                        Selected: {selectedImage.name}
                                    </p>
                                )}
                            </div>

                            {/* Caption Input with AI Helper */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-foreground">
                                        Post Caption
                                    </label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAIGenerate}
                                        className="flex items-center space-x-2">
                                        <Sparkles className="w-4 h-4" />
                                        <span>AI Caption Helper</span>
                                    </Button>
                                </div>
                                <Textarea
                                    placeholder="Share what's on your mind... or let AI help you write an engaging caption!"
                                    value={postContent}
                                    onChange={(e) =>
                                        setPostContent(e.target.value)
                                    }
                                    className="min-h-[120px] resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4">
                                <Button variant="outline">Save Draft</Button>
                                <Button>Publish Post</Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </div>
    );
}
