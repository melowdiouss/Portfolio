'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, MotionProps } from 'framer-motion';

interface AnimationWrapperProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function FadeIn({ children, className = '', delay = 0 }: AnimationWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeInLeft({ children, className = '', delay = 0 }: AnimationWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function ScaleIn({ children, className = '', delay = 0 }: AnimationWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function SlideIn({ children, className = '', delay = 0 }: AnimationWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerChildrenProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerChildren({ children, className = '', staggerDelay = 0.1 }: StaggerChildrenProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
};

interface ParallaxSectionProps {
    children: React.ReactNode;
    className?: string;
    speed?: number;
}

export function ParallaxSection({ children, className = '', speed = 0.3 }: ParallaxSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
}

export function SectionWrapper({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
    return (
        <section id={id} className={`relative py-20 md:py-32 px-4 md:px-8 ${className}`}>
            <div className="max-w-6xl mx-auto">
                {children}
            </div>
        </section>
    );
}

export function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
    return (
        <FadeIn className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{children}</h2>
            {subtitle && (
                <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">{subtitle}</p>
            )}
            <div className="mt-6 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]" />
        </FadeIn>
    );
}
