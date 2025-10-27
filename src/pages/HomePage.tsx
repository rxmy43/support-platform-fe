import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { HeartHandshake } from 'lucide-react';

export default function HomePage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gradient-to-br from-primary/5 via-background to-primary/10">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-2xl">
                <div className="flex items-center justify-center mb-6">
                    <HeartHandshake className="w-10 h-10 text-primary mr-2" />
                    <h1 className="text-3xl font-bold text-foreground">
                        Mini Support Platform
                    </h1>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                    📌 <strong>Mini Project:</strong> “Mini Support Platform” —
                    a super-simplified version of <em>Trakteer</em> or{' '}
                    <em>Saweria</em>, where fans can send small donations or
                    “tips” to their favorite creators.
                    <br />
                    <br />
                    This project was built as a{' '}
                    <strong>
                        technical test for{' '}
                        <a
                            href="https://dumbways.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 font-semibold hover:underline">
                            Dumbways ID
                        </a>
                    </strong>{' '}
                    by{' '}
                    <a
                        href="https://github.com/rxmy43"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-semibold hover:underline">
                        Ramy Abyyu
                    </a>
                    .
                </p>

                <div className="flex justify-center mt-8">
                    <Button
                        size="lg"
                        className="text-lg font-semibold px-8 py-6 rounded-xl">
                        <Link to="/login">Login to Continue</Link>
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
}
