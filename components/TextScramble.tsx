import React, { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
    text: string;
    className?: string;
    duration?: number;
    delay?: number;
}

const chars = '!<>-_\\/[]{}—=+*^?#';

const TextScramble: React.FC<TextScrambleProps> = ({
    text,
    className = '',
    duration = 1000,
    delay = 0
}) => {
    const [displayText, setDisplayText] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isAnimating) {
                    setIsAnimating(true);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [isAnimating]);

    useEffect(() => {
        if (!isAnimating) return;

        let frame = 0;
        let queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = [];

        // Initialize queue
        for (let i = 0; i < text.length; i++) {
            const from = chars[Math.floor(Math.random() * chars.length)];
            const to = text[i];
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            queue.push({ from, to, start, end });
        }

        let frameId: number;

        // Initial delay
        const timeoutId = setTimeout(() => {
            const update = () => {
                let output = '';
                let complete = 0;

                for (let i = 0; i < queue.length; i++) {
                    let { from, to, start, end, char } = queue[i];

                    if (frame >= end) {
                        complete++;
                        output += to;
                    } else if (frame >= start) {
                        if (!char || Math.random() < 0.28) {
                            char = chars[Math.floor(Math.random() * chars.length)];
                            queue[i].char = char;
                        }
                        output += `<span class="opacity-50 text-primary">${char}</span>`;
                    } else {
                        output += '<span class="opacity-0">.</span>';
                    }
                }

                setDisplayText(output);

                if (complete === queue.length) {
                    cancelAnimationFrame(frameId);
                } else {
                    frame++;
                    frameId = requestAnimationFrame(update);
                }
            };

            update();
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(frameId);
        };
    }, [isAnimating, text, delay]);

    return (
        <span
            ref={elementRef}
            className={`${className} whitespace-nowrap inline-block min-w-[2ch]`}
            dangerouslySetInnerHTML={{ __html: displayText || '&nbsp;' }}
        />
    );
};

export default TextScramble;
