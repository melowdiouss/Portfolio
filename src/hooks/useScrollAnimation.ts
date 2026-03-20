'use client';

import { useEffect, useState } from 'react';

interface ScrollAnimation {
    isVisible: boolean;
    y: number;
}

export const useScrollAnimation = (threshold = 0.1): ScrollAnimation => {
    const [isVisible, setIsVisible] = useState(false);
    const [y, setY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setY(window.scrollY);
            // Animation logic here if needed
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { isVisible, y };
};
