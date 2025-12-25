import React, { useEffect, useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    speed?: number; // 0.1 = slow, 0.5 = medium, 1 = fast
    backgroundContent?: ReactNode;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    children,
    className = '',
    id,
    speed = 0.3,
    backgroundContent
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !bgRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const scrolled = window.scrollY;
            const sectionTop = sectionRef.current.offsetTop;
            const windowHeight = window.innerHeight;

            // Only animate when section is in view
            if (rect.top < windowHeight && rect.bottom > 0) {
                const offset = (scrolled - sectionTop + windowHeight) * speed;
                bgRef.current.style.transform = `translateY(${offset * 0.3}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <section ref={sectionRef} id={id} className={`relative overflow-hidden ${className}`}>
            {/* Parallax background layer */}
            <div
                ref={bgRef}
                className="absolute inset-0 will-change-transform pointer-events-none z-0"
                style={{ top: '-20%', bottom: '-20%' }}
            >
                {/* Background effects container */}
                <div className="absolute inset-0 bg-black"></div>
                {backgroundContent}
            </div>

            {/* Content layer */}
            <div className="relative z-10">
                {children}
            </div>
        </section>
    );
};

export default ParallaxSection;
