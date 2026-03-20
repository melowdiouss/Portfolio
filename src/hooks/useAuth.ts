'use client';

import { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsAuthenticated(authService.isAuthenticated());
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await authService.login(username, password);
            authService.setToken(response.data.token);
            setIsAuthenticated(true);
            return response;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated,
        isLoading,
        login,
        logout,
    };
};
