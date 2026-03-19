'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle, StaggerChildren, staggerItem, FadeIn } from '@/components/ScrollAnimations';

const workItems = [
    {
        title: 'Open Source Contributions',
        description: 'Active contributor to several open-source projects, focusing on developer tools and UI libraries.',
        icon: '🌐',
        tags: ['React', 'TypeScript', 'Node.js'],
    },
    {
        title: 'Freelance Web Development',
        description: 'Built modern, responsive websites and web applications for startups and small businesses.',
        icon: '💼',
        tags: ['Next.js', 'Tailwind CSS', 'MongoDB'],
    },
    {
        title: 'Hackathon Projects',
        description: 'Participated in multiple hackathons, building innovative solutions under tight deadlines.',
        icon: '🏆',
        tags: ['Innovation', 'Teamwork', 'Rapid Prototyping'],
    },
    {
        title: 'Technical Writing',
        description: 'Published articles on web development best practices, modern architectures, and coding tutorials.',
        icon: '✍️',
        tags: ['Blog', 'Documentation', 'Tutorials'],
    },
];

export default function Work() {
    return (
        <SectionWrapper id="work">
            <SectionTitle subtitle="Collaborations, contributions, and professional work">
                Work & <span className="gradient-text">Collaborations</span>
            </SectionTitle>

            <StaggerChildren className="grid sm:grid-cols-2 gap-6" staggerDelay={0.1}>
                {workItems.map((item, i) => (
                    <motion.div
                        key={i}
                        variants={staggerItem}
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="p-6 rounded-2xl transition-all duration-300 group"
                        style={{
                            background: 'var(--card)',
                            border: '1px solid var(--card-border)',
                            boxShadow: 'var(--shadow-soft)',
                        }}
                    >
                        <span className="text-3xl mb-4 block">{item.icon}</span>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                            {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 rounded-md text-xs font-mono"
                                    style={{
                                        background: 'var(--glow-color)',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </StaggerChildren>
        </SectionWrapper>
    );
}
