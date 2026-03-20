import { fetchAPI, authHeaders } from './api.service';

export interface About {
    _id?: string;
    intro: string;
    skills: string[];
    timeline: Array<{
        year: string;
        title: string;
        description: string;
    }>;
}

export const aboutService = {
    get: () => fetchAPI('/about'),

    update: (data: About) =>
        fetchAPI('/about', {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(data),
        }),
};
