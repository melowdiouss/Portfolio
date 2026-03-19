'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated background grid */}
            <motion.div
                className="absolute inset-0 grid-pattern"
                style={{ y: backgroundY, scale: backgroundScale }}
            />

            {/* Gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-20 animate-pulse-glow"
                    style={{ background: 'var(--accent)' }}
                />
                <div
                    className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[120px] opacity-15 animate-pulse-glow"
                    style={{ background: 'var(--accent-secondary)', animationDelay: '1.5s' }}
                />
            </div>

            {/* Content */}
            <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                >
                    <p
                        className="text-sm md:text-base font-mono tracking-[0.3em] uppercase mb-6"
                        style={{ color: 'var(--accent)' }}
                    >
                        Full-Stack Developer
                    </p>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
                >
                    Hi, I&apos;m{' '}
                    <span className="gradient-text">Shreyansh</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
                    style={{ color: 'var(--muted)' }}
                >
                    I build performant, elegant digital experiences that bridge design and technology.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <motion.a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3.5 rounded-full font-medium text-white text-sm transition-shadow"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                            boxShadow: '0 4px 15px var(--glow-color)',
                        }}
                    >
                        View Projects
                    </motion.a>
                    <motion.a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3.5 rounded-full font-medium text-sm transition-all"
                        style={{
                            border: '1px solid var(--card-border)',
                            color: 'var(--foreground)',
                        }}
                    >
                        Contact Me
                    </motion.a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-5 h-8 rounded-full flex justify-center pt-2"
                        style={{ border: '2px solid var(--card-border)' }}
                    >
                        <motion.div
                            className="w-1 h-2 rounded-full"
                            style={{ background: 'var(--accent)' }}
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
