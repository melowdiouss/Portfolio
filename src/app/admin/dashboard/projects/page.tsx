'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Loader2, ArrowLeft } from 'lucide-react';
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/api';

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
    order: number;
}

const emptyProject: Omit<Project, '_id'> = {
    title: '',
    description: '',
    problem: '',
    solution: '',
    techStack: [],
    screenshots: [],
    githubUrl: '',
    liveUrl: '',
    thumbnail: '',
    order: 0,
};

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState<(Partial<Project> & typeof emptyProject) | null>(null);
    const [newTech, setNewTech] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await getProjects();
            if (Array.isArray(data)) setProjects(data);
        } catch (error) {
            console.error('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!editingProject) return;
        setSaving(true);
        setMessage('');
        try {
            if (editingProject._id) {
                await updateProject(editingProject._id, editingProject);
            } else {
                await createProject(editingProject);
            }
            setEditingProject(null);
            await loadProjects();
            setMessage('Project saved!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to save project.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await deleteProject(id);
            await loadProjects();
            setMessage('Project deleted.');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to delete project.');
        }
    };

    const addTech = () => {
        if (editingProject && newTech.trim()) {
            setEditingProject({
                ...editingProject,
                techStack: [...editingProject.techStack, newTech.trim()],
            });
            setNewTech('');
        }
    };

    const removeTech = (tech: string) => {
        if (editingProject) {
            setEditingProject({
                ...editingProject,
                techStack: editingProject.techStack.filter(t => t !== tech),
            });
        }
    };

    const inputStyle = {
        background: 'var(--background)',
        border: '1px solid var(--card-border)',
        color: 'var(--foreground)',
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin" size={24} style={{ color: 'var(--accent)' }} />
            </div>
        );
    }

    // Editing view
    if (editingProject) {
        return (
            <div>
                <button
                    onClick={() => setEditingProject(null)}
                    className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors"
                    style={{ color: 'var(--muted)' }}
                >
                    <ArrowLeft size={16} /> Back to Projects
                </button>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">
                        {editingProject._id ? 'Edit Project' : 'New Project'}
                    </h1>
                    <motion.button
                        onClick={handleSave}
                        disabled={saving}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white text-sm disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))' }}
                    >
                        {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        Save
                    </motion.button>
                </div>

                <div className="space-y-6">
                    <div
                        className="p-6 rounded-2xl space-y-4"
                        style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
                    >
                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                value={editingProject.title}
                                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                style={inputStyle}
                                placeholder="Project title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                value={editingProject.description}
                                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                                style={inputStyle}
                                placeholder="Short description"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Problem Statement</label>
                            <textarea
                                value={editingProject.problem}
                                onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                                style={inputStyle}
                                placeholder="What problem does this solve?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Solution</label>
                            <textarea
                                value={editingProject.solution}
                                onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                                style={inputStyle}
                                placeholder="How did you solve it?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Tech Stack</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {editingProject.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                                        style={{ background: 'var(--glow-color)', color: 'var(--accent)' }}
                                    >
                                        {tech}
                                        <button onClick={() => removeTech(tech)} className="hover:text-red-500">
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTech}
                                    onChange={(e) => setNewTech(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addTech()}
                                    className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                                    style={inputStyle}
                                    placeholder="Add technology..."
                                />
                                <button
                                    onClick={addTech}
                                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                                    style={{ background: 'var(--accent)' }}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                                <input
                                    type="url"
                                    value={editingProject.githubUrl}
                                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                    style={inputStyle}
                                    placeholder="https://github.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Live URL</label>
                                <input
                                    type="url"
                                    value={editingProject.liveUrl}
                                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                    style={inputStyle}
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Display Order</label>
                            <input
                                type="number"
                                value={editingProject.order}
                                onChange={(e) => setEditingProject({ ...editingProject, order: parseInt(e.target.value) || 0 })}
                                className="w-32 px-4 py-3 rounded-xl text-sm outline-none"
                                style={inputStyle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // List view
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        {projects.length} project{projects.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <motion.button
                    onClick={() => setEditingProject({ ...emptyProject })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white text-sm"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))' }}
                >
                    <Plus size={16} /> Add Project
                </motion.button>
            </div>

            {message && (
                <div className={`mb-6 p-3 rounded-xl text-sm text-center ${message.includes('deleted') || message.includes('saved') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                    {message}
                </div>
            )}

            {projects.length === 0 ? (
                <div
                    className="p-12 rounded-2xl text-center"
                    style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
                >
                    <p style={{ color: 'var(--muted)' }}>No projects yet. Add your first project!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="flex items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.005]"
                            style={{
                                background: 'var(--card)',
                                border: '1px solid var(--card-border)',
                            }}
                        >
                            <div className="flex-1">
                                <h3 className="font-semibold">{project.title}</h3>
                                <p className="text-sm line-clamp-1" style={{ color: 'var(--muted)' }}>
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {project.techStack.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 rounded text-xs"
                                            style={{ background: 'var(--glow-color)', color: 'var(--accent)' }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <button
                                    onClick={() => setEditingProject(project)}
                                    className="p-2 rounded-lg transition-colors hover:bg-[var(--glow-color)]"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="p-2 rounded-lg transition-colors hover:bg-red-500/10 hover:text-red-500"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
