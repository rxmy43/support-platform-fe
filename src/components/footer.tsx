import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-background border-t border-border py-6 flex justify-center mt-auto">
            <p className="flex items-center gap-1 text-sm text-muted-foreground transition-all duration-300 hover:gap-2">
                Made with
                <Heart
                    className="w-4 h-4 text-red-500 animate-pulse"
                    strokeWidth={2.5}
                    fill="currentColor"
                />
                by{' '}
                <a
                    href="https://github.com/rxmy43"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground hover:text-primary transition-colors duration-300">
                    Ramy Abyyu
                </a>
            </p>
        </footer>
    );
}
