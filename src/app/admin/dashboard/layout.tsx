'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, User, FolderOpen, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const sidebarLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/admin/dashboard/about', label: 'About', icon: <User size={18} /> },
    { href: '/admin/dashboard/projects', label: 'Projects', icon: <FolderOpen size={18} /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('admin-token');
        if (!token) {
            router.push('/admin/login');
        } else {
            setIsAuthed(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('admin-token');
        router.push('/admin/login');
    };

    if (!isAuthed) return null;

    return (
        <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
            {/* Sidebar */}
            <aside
                className="w-64 min-h-screen p-6 flex flex-col"
                style={{
                    background: 'var(--card)',
                    borderRight: '1px solid var(--card-border)',
                }}
            >
                <Link href="/" className="text-xl font-bold mb-8 block">
                    <span className="gradient-text">&lt;S/&gt;</span>
                    <span className="text-sm font-normal ml-2" style={{ color: 'var(--muted)' }}>Admin</span>
                </Link>

                <nav className="flex-1 space-y-1">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'text-white' : ''
                                    }`}
                                style={
                                    isActive
                                        ? { background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))' }
                                        : { color: 'var(--muted)' }
                                }
                            >
                                {link.icon}
                                {link.label}
                                {isActive && <ChevronRight size={14} className="ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-red-500/10 hover:text-red-500"
                    style={{ color: 'var(--muted)' }}
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
