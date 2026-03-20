'use client';

/**
 * Auth Store - using React Context
 * For Zustand integration, install zustand and replace with Zustand store
 */

import { createContext, ReactNode, useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { User } from '@/types/user.types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated
        if (authService.isAuthenticated()) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await authService.login(username, password);
            authService.setToken(response.token);
            setUser(response.user);
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };
};