import React, { useEffect, useRef, useState } from 'react';

interface GlitchRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const GlitchReveal: React.FC<GlitchRevealProps> = ({
    children,
    className = '',
    delay = 0
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            {/* Main Content */}
            <div
                className={`transition-opacity duration-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
                {children}
            </div>

            {/* Glitch Overlay - Only runs once when visible */}
            {isVisible && (
                <>
                    <div className="absolute inset-0 animate-glitch-1 opacity-50 pointer-events-none mix-blend-screen text-red-500 overflow-hidden" aria-hidden="true">
                        {children}
                    </div>
                    <div className="absolute inset-0 animate-glitch-2 opacity-50 pointer-events-none mix-blend-screen text-blue-500 overflow-hidden" aria-hidden="true">
                        {children}
                    </div>
                </>
            )}


        </div>
    );
};

export default GlitchReveal;
