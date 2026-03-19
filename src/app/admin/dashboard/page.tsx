'use client';

import React from 'react';
import { FolderOpen, User, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
            <p className="mb-8" style={{ color: 'var(--muted)' }}>
                Welcome back! Manage your portfolio content here.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                    href="/admin/dashboard/about"
                    className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] group"
                    style={{
                        background: 'var(--card)',
                        border: '1px solid var(--card-border)',
                        boxShadow: 'var(--shadow-soft)',
                    }}
                >
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: 'var(--glow-color)' }}
                    >
                        <User size={20} style={{ color: 'var(--accent)' }} />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors">About</h3>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        Edit your intro, skills, and timeline
                    </p>
                </Link>

                <Link
                    href="/admin/dashboard/projects"
                    className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] group"
                    style={{
                        background: 'var(--card)',
                        border: '1px solid var(--card-border)',
                        boxShadow: 'var(--shadow-soft)',
                    }}
                >
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: 'var(--glow-color)' }}
                    >
                        <FolderOpen size={20} style={{ color: 'var(--accent)' }} />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors">Projects</h3>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        Add, edit, or remove projects
                    </p>
                </Link>

                <div
                    className="p-6 rounded-2xl"
                    style={{
                        background: 'var(--card)',
                        border: '1px solid var(--card-border)',
                        boxShadow: 'var(--shadow-soft)',
                    }}
                >
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: 'var(--glow-color)' }}
                    >
                        <BarChart3 size={20} style={{ color: 'var(--accent)' }} />
                    </div>
                    <h3 className="font-semibold mb-1">Analytics</h3>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        Coming soon
                    </p>
                </div>
            </div>
        </div>
    );
}
