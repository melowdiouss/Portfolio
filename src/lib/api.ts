const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'API Error' }));
        throw new Error(error.message || 'Something went wrong');
    }

    return res.json();
}

function authHeaders(): HeadersInit {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('admin-token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// Public APIs
export const getAbout = () => fetchAPI('/about');
export const getProjects = () => fetchAPI('/projects');
export const getProject = (id: string) => fetchAPI(`/projects/${id}`);

// Auth
export const login = (username: string, password: string) =>
    fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });

export const register = (username: string, password: string) =>
    fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });

// Protected APIs
export const updateAbout = (data: Record<string, unknown>) =>
    fetchAPI('/about', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

export const createProject = (data: Record<string, unknown>) =>
    fetchAPI('/projects', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

export const updateProject = (id: string, data: Record<string, unknown>) =>
    fetchAPI(`/projects/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

export const deleteProject = (id: string) =>
    fetchAPI(`/projects/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    });

export const uploadImage = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: authHeaders(),
        body: formData,
    });

    if (!res.ok) throw new Error('Upload failed');
    return res.json();
};
