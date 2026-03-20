/**
 * Validation helper functions
 */

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const isValidUsername = (username: string): boolean => {
    return username.length >= 3 && username.length <= 20;
};

export const isValidPassword = (password: string): boolean => {
    // At least 6 characters
    return password.length >= 6;
};

export const validateProjectForm = (data: {
    title: string;
    description: string;
    techStack: string[];
}): string[] => {
    const errors: string[] = [];

    if (!data.title || data.title.trim().length === 0) {
        errors.push('Title is required');
    }

    if (!data.description || data.description.trim().length === 0) {
        errors.push('Description is required');
    }

    if (!data.techStack || data.techStack.length === 0) {
        errors.push('At least one technology is required');
    }

    return errors;
};
