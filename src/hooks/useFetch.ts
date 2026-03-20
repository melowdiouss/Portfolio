'use client';

import { useState, useCallback } from 'react';

interface UseFetchOptions extends RequestInit {
    skip?: boolean;
}

interface UseFetchState<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

export const useFetch = <T = any>(
    url: string,
    options?: UseFetchOptions
): UseFetchState<T> & { refetch: () => Promise<void> } => {
    const [state, setState] = useState<UseFetchState<T>>({
        data: null,
        isLoading: true,
        error: null,
    });

    const fetchData = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error('Fetch failed');
            const json = await response.json();
            setState({ data: json, isLoading: false, error: null });
        } catch (error) {
            setState({
                data: null,
                isLoading: false,
                error: error instanceof Error ? error : new Error('Unknown error'),
            });
        }
    }, [url, options]);

    React.useEffect(() => {
        if (options?.skip) return;
        fetchData();
    }, [options?.skip, fetchData]);

    return { ...state, refetch: fetchData };
};

import React from 'react';
