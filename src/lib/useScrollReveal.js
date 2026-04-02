import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal hook using IntersectionObserver.
 * Adds className (default 'srv-visible') when element enters viewport.
 */
export const useScrollReveal = (options = {}) => {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const { className = 'srv-visible', ...observerOpts } = options;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add(className);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.12, ...observerOpts }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
};
