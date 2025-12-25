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

            <style>{`
        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(100% 0 0 0); transform: translate(0); opacity: 0; }
        }
        @keyframes glitch-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 1px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, -1px); }
          100% { clip-path: inset(100% 0 0 0); transform: translate(0); opacity: 0; }
        }
        .animate-glitch-1 {
          animation: glitch-1 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        .animate-glitch-2 {
          animation: glitch-2 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both reverse;
        }
      `}</style>
        </div>
    );
};

export default GlitchReveal;
