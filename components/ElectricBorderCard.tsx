import React from 'react';

interface ElectricBorderCardProps {
    children?: React.ReactNode;
    className?: string;
    delay?: number;
}

const ElectricBorderCard: React.FC<ElectricBorderCardProps> = ({
    children,
    className = "",
    delay = 0
}) => {
    return (
        <div
            className={`group relative electric-card-container select-none ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="inner-container w-full h-full absolute inset-0">
                <div className="border-outer w-full h-full absolute inset-0">
                    <div className="main-card"></div>
                </div>
                <div className="glow-layer-1"></div>
                <div className="glow-layer-2"></div>
            </div>

            <div className="overlay-1"></div>
            <div className="overlay-2"></div>
            <div className="background-glow"></div>

            {/* Content */}
            <div className="electric-content relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default ElectricBorderCard;
