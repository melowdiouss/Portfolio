'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const Loader3D = dynamic(() => import('@/components/3d/Loader3D'), {
    ssr: false,
    loading: () => <div />,
});

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
                    style={{ background: 'var(--background)' }}
                >
                    {/* 3D Model */}
                    <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] mb-8">
                        <Loader3D />
                    </div>

                    {/* Progress bar */}
                    <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--card-border)' }}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))',
                            }}
                            initial={{ width: '0%' }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Loading text */}
                    <motion.p
                        className="mt-4 text-sm font-mono tracking-widest uppercase"
                        style={{ color: 'var(--muted)' }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        Loading
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
