'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Globe, Layers, Palette, Server, Smartphone, Terminal, Cpu, GitBranch, Cloud, Shield } from 'lucide-react';
import { SectionWrapper, SectionTitle, FadeIn, FadeInLeft, SlideIn, StaggerChildren, staggerItem } from '@/components/ScrollAnimations';

interface AboutData {
    intro: string;
    skills: string[];
    timeline: { year: string; title: string; description: string }[];
}

const defaultAbout: AboutData = {
    intro: "I'm a passionate full-stack developer with a love for crafting clean, performant, and visually stunning web applications. With expertise spanning from React and Next.js on the frontend to Node.js and MongoDB on the backend, I bring ideas to life through code. I'm driven by curiosity, fueled by challenges, and committed to continuous learning.",
    skills: [
        'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
        'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Three.js', 'Git',
        'Docker', 'AWS', 'Python', 'REST APIs', 'GraphQL', 'Redis',
    ],
    timeline: [
        { year: '2024', title: 'Full-Stack Developer', description: 'Building modern web applications with React, Next.js, and Node.js' },
        { year: '2023', title: 'Frontend Specialist', description: 'Focused on creating responsive, accessible, and performant UIs' },
        { year: '2022', title: 'Started Coding Journey', description: 'Began learning web development, building projects, and contributing to open source' },
    ],
};

const skillIcons: Record<string, React.ReactNode> = {
    'React': <Globe size={16} />,
    'Next.js': <Layers size={16} />,
    'TypeScript': <Code2 size={16} />,
    'Node.js': <Server size={16} />,
    'Express': <Terminal size={16} />,
    'MongoDB': <Database size={16} />,
    'PostgreSQL': <Database size={16} />,
    'Tailwind CSS': <Palette size={16} />,
    'Three.js': <Cpu size={16} />,
    'Git': <GitBranch size={16} />,
    'Docker': <Cloud size={16} />,
    'AWS': <Cloud size={16} />,
    'Python': <Code2 size={16} />,
    'REST APIs': <Globe size={16} />,
    'GraphQL': <Globe size={16} />,
    'Redis': <Database size={16} />,
};

export default function About() {
    const [about, setAbout] = useState<AboutData>(defaultAbout);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/about`)
            .then(res => res.json())
            .then(data => {
                if (data && data.intro) setAbout(data);
            })
            .catch(() => {
                // Use default data
            });
    }, []);

    return (
        <SectionWrapper id="about">
            <SectionTitle subtitle="A little bit about who I am and what I do">
                About <span className="gradient-text">Me</span>
            </SectionTitle>

            <div className="grid md:grid-cols-5 gap-12 items-start">
                {/* Intro */}
                <FadeInLeft className="md:col-span-3">
                    <div
                        className="p-6 md:p-8 rounded-2xl transition-all duration-300"
                        style={{
                            background: 'var(--card)',
                            border: '1px solid var(--card-border)',
                            boxShadow: 'var(--shadow-md)',
                        }}
                    >
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Code2 size={20} style={{ color: 'var(--accent)' }} />
                            Who I Am
                        </h3>
                        <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
                            {about.intro}
                        </p>
                    </div>
                </FadeInLeft>

                {/* Quick Stats */}
                <SlideIn className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Projects', value: '10+' },
                            { label: 'Technologies', value: '15+' },
                            { label: 'Experience', value: '2+ yrs' },
                            { label: 'Open Source', value: '5+' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="p-4 rounded-xl text-center transition-all duration-300 hover:scale-105"
                                style={{
                                    background: 'var(--card)',
                                    border: '1px solid var(--card-border)',
                                    boxShadow: 'var(--shadow-soft)',
                                }}
                            >
                                <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </SlideIn>
            </div>

            {/* Skills */}
            <FadeIn className="mt-16" delay={0.2}>
                <h3 className="text-xl font-semibold mb-6 text-center">Tech Stack</h3>
                <StaggerChildren className="flex flex-wrap justify-center gap-3" staggerDelay={0.05}>
                    {about.skills.map((skill) => (
                        <motion.span
                            key={skill}
                            variants={staggerItem}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-default transition-all"
                            style={{
                                background: 'var(--card)',
                                border: '1px solid var(--card-border)',
                                color: 'var(--foreground)',
                            }}
                        >
                            <span style={{ color: 'var(--accent)' }}>
                                {skillIcons[skill] || <Code2 size={16} />}
                            </span>
                            {skill}
                        </motion.span>
                    ))}
                </StaggerChildren>
            </FadeIn>

            {/* Timeline */}
            {about.timeline.length > 0 && (
                <FadeIn className="mt-16" delay={0.3}>
                    <h3 className="text-xl font-semibold mb-8 text-center">Journey</h3>
                    <div className="relative max-w-2xl mx-auto">
                        {/* Vertical line */}
                        <div
                            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                            style={{ background: 'var(--card-border)' }}
                        />

                        {about.timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                <div className="flex-1 ml-10 md:ml-0">
                                    <div
                                        className="p-4 rounded-xl transition-all"
                                        style={{
                                            background: 'var(--card)',
                                            border: '1px solid var(--card-border)',
                                        }}
                                    >
                                        <span
                                            className="text-xs font-mono font-bold"
                                            style={{ color: 'var(--accent)' }}
                                        >
                                            {item.year}
                                        </span>
                                        <h4 className="font-semibold mt-1">{item.title}</h4>
                                        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Dot */}
                                <div
                                    className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-5 z-10"
                                    style={{
                                        background: 'var(--accent)',
                                        boxShadow: '0 0 10px var(--glow-color)',
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </FadeIn>
            )}
        </SectionWrapper>
    );
}
