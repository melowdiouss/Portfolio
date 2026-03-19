'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Twitter, Mail, Download, ArrowUpRight } from 'lucide-react';
import { SectionWrapper, SectionTitle, FadeIn, StaggerChildren, staggerItem } from '@/components/ScrollAnimations';

const socials = [
    { name: 'GitHub', icon: <Github size={22} />, href: 'https://github.com', color: '#333' },
    { name: 'LinkedIn', icon: <Linkedin size={22} />, href: 'https://linkedin.com', color: '#0077b5' },
    { name: 'Instagram', icon: <Instagram size={22} />, href: 'https://instagram.com', color: '#e1306c' },
    { name: 'Twitter', icon: <Twitter size={22} />, href: 'https://twitter.com', color: '#1da1f2' },
];

export default function Contact() {
    return (
        <SectionWrapper id="contact">
            <SectionTitle subtitle="Let's connect — I'm always open to new opportunities">
                Get In <span className="gradient-text">Touch</span>
            </SectionTitle>

            <div className="max-w-2xl mx-auto text-center">
                <FadeIn>
                    <p className="text-lg mb-10" style={{ color: 'var(--muted)' }}>
                        Whether you have a project in mind, want to collaborate, or just want to say hello,
                        I&apos;d love to hear from you. Feel free to reach out through any of the channels below.
                    </p>
                </FadeIn>

                {/* Social Links */}
                <FadeIn delay={0.1}>
                    <StaggerChildren className="flex justify-center gap-4 mb-10" staggerDelay={0.05}>
                        {socials.map((social) => (
                            <motion.a
                                key={social.name}
                                variants={staggerItem}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.15, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
                                style={{
                                    background: 'var(--card)',
                                    border: '1px solid var(--card-border)',
                                    color: 'var(--foreground)',
                                }}
                                title={social.name}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </StaggerChildren>
                </FadeIn>

                {/* CTA Buttons */}
                <FadeIn delay={0.2}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.a
                            href="mailto:shreyansh@example.com"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium text-white text-sm"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                                boxShadow: '0 4px 15px var(--glow-color)',
                            }}
                        >
                            <Mail size={18} />
                            Send Email
                            <ArrowUpRight size={16} />
                        </motion.a>
                        <motion.a
                            href="/resume.pdf"
                            download
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm"
                            style={{
                                border: '1px solid var(--card-border)',
                                color: 'var(--foreground)',
                            }}
                        >
                            <Download size={18} />
                            Download Resume
                        </motion.a>
                    </div>
                </FadeIn>

                {/* Footer */}
                <FadeIn delay={0.3} className="mt-20 pt-8" >
                    <div
                        className="pt-8"
                        style={{ borderTop: '1px solid var(--card-border)' }}
                    >
                        <p className="text-sm" style={{ color: 'var(--muted)' }}>
                            © {new Date().getFullYear()} Shreyansh. Built with{' '}
                            <span style={{ color: 'var(--accent)' }}>Next.js</span>,{' '}
                            <span style={{ color: 'var(--accent)' }}>Three.js</span> &{' '}
                            <span style={{ color: 'var(--accent)' }}>Framer Motion</span>.
                        </p>
                    </div>
                </FadeIn>
            </div>
        </SectionWrapper>
    );
}
