import { fetchAPI, authHeaders } from './api.service';

export const authService = {
    login: (username: string, password: string) =>
        fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        }),

    register: (username: string, password: string) =>
        fetchAPI('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        }),

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('admin-token');
        }
    },

    getToken: () => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('admin-token');
    },

    setToken: (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('admin-token', token);
        }
    },

    isAuthenticated: () => {
        if (typeof window === 'undefined') return false;
        return !!localStorage.getItem('admin-token');
    },
};
