import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  effect?: 'fade' | 'slide' | 'scale' | 'rotate' | 'blur' | 'flip';
  distance?: number;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  delay = 0,
  direction = 'up',
  duration = 800,
  effect = 'slide',
  distance = 60
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getInitialTransform = () => {
    const transforms: string[] = [];

    // Direction-based transform
    switch (direction) {
      case 'up': transforms.push(`translateY(${distance}px)`); break;
      case 'down': transforms.push(`translateY(-${distance}px)`); break;
      case 'left': transforms.push(`translateX(-${distance}px)`); break;
      case 'right': transforms.push(`translateX(${distance}px)`); break;
    }

    // Effect-based transform
    switch (effect) {
      case 'scale': transforms.push('scale(0.8)'); break;
      case 'rotate': transforms.push('rotate(-10deg)'); break;
      case 'flip': transforms.push('rotateX(90deg)'); break;
    }

    return transforms.join(' ');
  };

  const getInitialFilter = () => {
    if (effect === 'blur') return 'blur(10px)';
    return 'blur(0px)';
  };

  const style: React.CSSProperties = {
    transitionProperty: 'transform, opacity, filter',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transform: isVisible ? 'translate(0, 0) scale(1) rotate(0deg) rotateX(0deg)' : getInitialTransform(),
    opacity: isVisible ? 1 : 0,
    filter: isVisible ? 'blur(0px)' : getInitialFilter(),
    willChange: 'transform, opacity, filter',
  };

  return (
    <div
      ref={ref}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
};

export default Reveal;