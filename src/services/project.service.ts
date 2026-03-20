import { fetchAPI, authHeaders } from './api.service';

export interface Project {
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
    createdAt: string;
    updatedAt: string;
}

export const projectService = {
    getAll: () => fetchAPI('/projects'),

    getById: (id: string) => fetchAPI(`/projects/${id}`),

    create: (data: Partial<Project>) =>
        fetchAPI('/projects', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(data),
        }),

    update: (id: string, data: Partial<Project>) =>
        fetchAPI(`/projects/${id}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(data),
        }),

    delete: (id: string) =>
        fetchAPI(`/projects/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        }),
};
