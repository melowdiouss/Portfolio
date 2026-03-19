'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const ThemeToggle3D = dynamic(() => import('@/components/3d/ThemeToggle3D'), {
    ssr: false,
    loading: () => (
        <div className="w-[60px] h-[30px] rounded-full" style={{ background: 'var(--card)' }} />
    ),
});

const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#work', label: 'Work' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        setIsMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-5'
                    }`}
            >
                <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#hero"
                        onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
                        className="text-xl font-bold tracking-tight"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="gradient-text">&lt;S/&gt;</span>
                    </motion.a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                                className="text-sm font-medium transition-colors relative group"
                                style={{ color: 'var(--muted)' }}
                                whileHover={{ color: 'var(--foreground)' }}
                            >
                                {link.label}
                                <span
                                    className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full"
                                    style={{ background: 'var(--accent)' }}
                                />
                            </motion.a>
                        ))}
                        <ThemeToggle3D />
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="flex md:hidden items-center gap-3">
                        <ThemeToggle3D />
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 pt-20 glass"
                    >
                        <div className="flex flex-col items-center gap-6 pt-10">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                                    className="text-lg font-medium"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
