import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
    end: number;
    suffix?: string;
    duration?: number;
    className?: string;
}

const CountUp: React.FC<CountUpProps> = ({
    end,
    suffix = '',
    duration = 2000,
    className = ''
}) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    startAnimation();
                    setHasAnimated(true);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const startAnimation = () => {
        let startTime: number | null = null;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function (easeOutExpo)
            const easeOut = (x: number): number => {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            };

            setCount(Math.floor(easeOut(percentage) * end));

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };
        requestAnimationFrame(animate);
    };

    return (
        <span ref={elementRef} className={className}>
            {count}{suffix}
        </span>
    );
};

export default CountUp;
