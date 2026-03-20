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

export interface About {
    _id?: string;
    intro: string;
    skills: string[];
    timeline: TimelineItem[];
}

export interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

export interface User {
    id: string;
    username: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
