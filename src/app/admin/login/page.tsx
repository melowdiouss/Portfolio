'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await login(username, password);
            localStorage.setItem('admin-token', data.token);
            router.push('/admin/dashboard');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ background: 'var(--background)' }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div
                    className="p-8 rounded-2xl"
                    style={{
                        background: 'var(--card)',
                        border: '1px solid var(--card-border)',
                        boxShadow: 'var(--shadow-lg)',
                    }}
                >
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
                        <p className="text-sm" style={{ color: 'var(--muted)' }}>
                            Sign in to manage your portfolio
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                                style={{
                                    background: 'var(--background)',
                                    border: '1px solid var(--card-border)',
                                    color: 'var(--foreground)',
                                }}
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 pr-12"
                                    style={{
                                        background: 'var(--background)',
                                        border: '1px solid var(--card-border)',
                                        color: 'var(--foreground)',
                                    }}
                                    placeholder="Enter password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white text-sm disabled:opacity-50"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                            }}
                        >
                            <LogIn size={18} />
                            {loading ? 'Signing in...' : 'Sign In'}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
