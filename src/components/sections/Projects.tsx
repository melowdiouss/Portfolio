'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronRight } from 'lucide-react';
import { SectionWrapper, SectionTitle, FadeIn, StaggerChildren, staggerItem } from '@/components/ScrollAnimations';

interface Project {
    _id: string;
    title: string;
    description: string;
    problem: string;
    solution: string;
    techStack: string[];
    screenshots: string[];
    githubUrl: string;
    liveUrl: string;
    thumbnail: string;
}

const defaultProjects: Project[] = [
    {
        _id: '1',
        title: 'E-Commerce Platform',
        description: 'A modern, full-featured e-commerce platform with real-time inventory management.',
        problem: 'Traditional e-commerce solutions were slow, bloated, and provided poor developer experience.',
        solution: 'Built a headless e-commerce platform using Next.js for the storefront and Node.js microservices for the backend, achieving sub-second page loads and seamless checkout flow.',
        techStack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'Docker'],
        screenshots: [],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        thumbnail: '',
    },
    {
        _id: '2',
        title: 'Real-Time Chat App',
        description: 'End-to-end encrypted messaging application with video calling support.',
        problem: 'Most chat applications lack proper encryption and have high latency for real-time features.',
        solution: 'Implemented WebSocket-based real-time messaging with end-to-end encryption using the Signal protocol, plus WebRTC for peer-to-peer video calls.',
        techStack: ['React', 'Socket.io', 'WebRTC', 'Express', 'PostgreSQL'],
        screenshots: [],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        thumbnail: '',
    },
    {
        _id: '3',
        title: 'AI Content Generator',
        description: 'AI-powered tool for generating marketing copy, blog posts, and social media content.',
        problem: 'Content creation is time-consuming and requires specialized skills that many businesses lack.',
        solution: 'Leveraged OpenAI APIs with fine-tuned prompts and a user-friendly interface to generate high-quality content tailored to specific brand voices and audiences.',
        techStack: ['Next.js', 'Python', 'FastAPI', 'OpenAI', 'Tailwind CSS'],
        screenshots: [],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        thumbnail: '',
    },
    {
        _id: '4',
        title: 'DevOps Dashboard',
        description: 'Unified monitoring dashboard for cloud infrastructure and CI/CD pipelines.',
        problem: 'Teams juggle multiple tools to monitor their infrastructure, leading to slow incident response times.',
        solution: 'Created a single-pane-of-glass dashboard that aggregates metrics from AWS, GitHub Actions, and custom monitoring agents with real-time alerting.',
        techStack: ['React', 'TypeScript', 'Go', 'Grafana', 'Prometheus', 'AWS'],
        screenshots: [],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        thumbnail: '',
    },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
    // Generate gradient colors based on project index
    const gradients = [
        'from-indigo-500/20 to-purple-500/20',
        'from-cyan-500/20 to-blue-500/20',
        'from-emerald-500/20 to-teal-500/20',
        'from-orange-500/20 to-rose-500/20',
    ];
    const idx = defaultProjects.findIndex(p => p._id === project._id) % gradients.length;

    return (
        <motion.div
            variants={staggerItem}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={onClick}
            className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300"
            style={{
                background: 'var(--card)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--shadow-md)',
            }}
        >
            {/* Thumbnail / Gradient placeholder */}
            <div className={`h-48 bg-gradient-to-br ${gradients[idx]} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold opacity-20">{project.title.charAt(0)}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--card)] to-transparent" />
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-[var(--accent)] transition-colors">
                        {project.title}
                    </h3>
                    <ChevronRight
                        size={18}
                        className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1"
                        style={{ color: 'var(--accent)' }}
                    />
                </div>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--muted)' }}>
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs font-mono"
                            style={{
                                background: 'var(--glow-color)',
                                color: 'var(--accent)',
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 4 && (
                        <span className="px-2.5 py-1 rounded-md text-xs font-mono" style={{ color: 'var(--muted)' }}>
                            +{project.techStack.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8 z-10"
                style={{
                    background: 'var(--card)',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--shadow-lg)',
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-[var(--card-border)]"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h2>
                <p className="mb-6" style={{ color: 'var(--muted)' }}>{project.description}</p>

                <div className="space-y-6">
                    {/* Problem */}
                    <div>
                        <h3 className="text-sm font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
                            Problem
                        </h3>
                        <p style={{ color: 'var(--muted)' }}>{project.problem}</p>
                    </div>

                    {/* Solution */}
                    <div>
                        <h3 className="text-sm font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
                            Solution
                        </h3>
                        <p style={{ color: 'var(--muted)' }}>{project.solution}</p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h3 className="text-sm font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                                    style={{
                                        background: 'var(--glow-color)',
                                        color: 'var(--accent)',
                                        border: '1px solid var(--card-border)',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-4">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
                                style={{
                                    border: '1px solid var(--card-border)',
                                    color: 'var(--foreground)',
                                }}
                            >
                                <Github size={16} />
                                GitHub
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                                }}
                            >
                                <ExternalLink size={16} />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>(defaultProjects);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) setProjects(data);
            })
            .catch(() => {
                // Use default data
            });
    }, []);

    return (
        <SectionWrapper id="projects">
            <SectionTitle subtitle="A selection of projects I've built and worked on">
                Featured <span className="gradient-text">Projects</span>
            </SectionTitle>

            <StaggerChildren className="grid sm:grid-cols-2 gap-6" staggerDelay={0.1}>
                {projects.map((project) => (
                    <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={() => setSelectedProject(project)}
                    />
                ))}
            </StaggerChildren>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
