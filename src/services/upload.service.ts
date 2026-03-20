import { authHeaders } from './api.service';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const uploadService = {
    uploadImage: async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(`${API_BASE}/upload/image`, {
            method: 'POST',
            headers: {
                ...authHeaders(),
            },
            body: formData,
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Upload failed');
        }

        return res.json();
    },

    uploadResume: async (file: File) => {
        const formData = new FormData();
        formData.append('resume', file);

        const res = await fetch(`${API_BASE}/upload/resume`, {
            method: 'POST',
            headers: {
                ...authHeaders(),
            },
            body: formData,
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Upload failed');
        }

        return res.json();
    },
};
