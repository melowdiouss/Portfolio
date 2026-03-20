/**
 * API Constants
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
    },
    PROJECTS: {
        LIST: '/projects',
        GET: (id: string) => `/projects/${id}`,
        CREATE: '/projects',
        UPDATE: (id: string) => `/projects/${id}`,
        DELETE: (id: string) => `/projects/${id}`,
    },
    ABOUT: {
        GET: '/about',
        UPDATE: '/about',
    },
    UPLOAD: {
        IMAGE: '/upload/image',
        RESUME: '/upload/resume',
    },
};

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'admin-token',
    THEME: 'theme-preference',
};
