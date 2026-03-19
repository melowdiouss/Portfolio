'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, X, Loader2 } from 'lucide-react';
import { getAbout, updateAbout } from '@/lib/api';

interface TimelineEntry {
    year: string;
    title: string;
    description: string;
}

export default function AdminAbout() {
    const [intro, setIntro] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState('');
    const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadAbout();
    }, []);

    const loadAbout = async () => {
        try {
            const data = await getAbout();
            setIntro(data.intro || '');
            setSkills(data.skills || []);
            setTimeline(data.timeline || []);
        } catch (error) {
            console.error('Failed to load about data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await updateAbout({ intro, skills, timeline });
            setMessage('Saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to save.');
        } finally {
            setSaving(false);
        }
    };

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const removeSkill = (skill: string) => {
        setSkills(skills.filter(s => s !== skill));
    };

    const addTimelineEntry = () => {
        setTimeline([...timeline, { year: '', title: '', description: '' }]);
    };

    const updateTimelineEntry = (index: number, field: keyof TimelineEntry, value: string) => {
        const updated = [...timeline];
        updated[index][field] = value;
        setTimeline(updated);
    };

    const removeTimelineEntry = (index: number) => {
        setTimeline(timeline.filter((_, i) => i !== index));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin" size={24} style={{ color: 'var(--accent)' }} />
            </div>
        );
    }

    const inputStyle = {
        background: 'var(--background)',
        border: '1px solid var(--card-border)',
        color: 'var(--foreground)',
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">About</h1>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>Edit your personal information</p>
                </div>
                <motion.button
                    onClick={handleSave}
                    disabled={saving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white text-sm disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))' }}
                >
                    {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    Save Changes
                </motion.button>
            </div>

            {message && (
                <div className={`mb-6 p-3 rounded-xl text-sm text-center ${message.includes('success') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                    {message}
                </div>
            )}

            <div className="space-y-8">
                {/* Intro */}
                <div
                    className="p-6 rounded-2xl"
                    style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
                >
                    <h3 className="font-semibold mb-4">Introduction</h3>
                    <textarea
                        value={intro}
                        onChange={(e) => setIntro(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                        style={inputStyle}
                        placeholder="Write your intro..."
                    />
                </div>

                {/* Skills */}
                <div
                    className="p-6 rounded-2xl"
                    style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
                >
                    <h3 className="font-semibold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                                style={{ background: 'var(--glow-color)', color: 'var(--accent)' }}
                            >
                                {skill}
                                <button onClick={() => removeSkill(skill)} className="hover:text-red-500">
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                            style={inputStyle}
                            placeholder="Add a skill..."
                        />
                        <button
                            onClick={addSkill}
                            className="px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                            style={{ background: 'var(--accent)' }}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>

                {/* Timeline */}
                <div
                    className="p-6 rounded-2xl"
                    style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Timeline</h3>
                        <button
                            onClick={addTimelineEntry}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium"
                            style={{ background: 'var(--glow-color)', color: 'var(--accent)' }}
                        >
                            <Plus size={14} /> Add Entry
                        </button>
                    </div>
                    <div className="space-y-4">
                        {timeline.map((entry, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl space-y-3"
                                style={{ background: 'var(--background)', border: '1px solid var(--card-border)' }}
                            >
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={entry.year}
                                        onChange={(e) => updateTimelineEntry(i, 'year', e.target.value)}
                                        className="w-24 px-3 py-2 rounded-lg text-sm outline-none"
                                        style={inputStyle}
                                        placeholder="Year"
                                    />
                                    <input
                                        type="text"
                                        value={entry.title}
                                        onChange={(e) => updateTimelineEntry(i, 'title', e.target.value)}
                                        className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                                        style={inputStyle}
                                        placeholder="Title"
                                    />
                                    <button
                                        onClick={() => removeTimelineEntry(i)}
                                        className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <textarea
                                    value={entry.description}
                                    onChange={(e) => updateTimelineEntry(i, 'description', e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                                    style={inputStyle}
                                    placeholder="Description"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
