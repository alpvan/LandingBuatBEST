import React from 'react';
import { User } from 'lucide-react';
import ElectricBorderCard from './ElectricBorderCard';

interface MemberCardProps {
    name: string;
    role: string;
    division?: string;
    image?: string;
    color?: string; // Hex or tailwind class for accent
    delay?: number;
}

const MemberCard: React.FC<MemberCardProps> = ({
    name,
    role,
    division,
    image,
    color = "from-primary to-amber-500",
    delay = 0
}) => {
    return (
        <ElectricBorderCard
            className="w-64 h-[350px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            delay={delay}
        >
            <div className="flex flex-col items-center text-center h-full p-5">
                {/* Hover Gradient Background (Optional - might conflict with electric effect, removing or making subtle) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>

                {/* Image / Avatar */}
                <div className={`relative w-24 h-24 rounded-full p-[2px] bg-gradient-to-br ${color} mb-4 shadow-[0_0_20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all duration-500 mt-8`}>
                    <div className="w-full h-full rounded-full bg-surface-dark overflow-hidden flex items-center justify-center">
                        {image ? (
                            <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                            <User className="w-10 h-10 text-gray-400 group-hover:text-primary transition-colors" />
                        )}
                    </div>
                </div>

                {/* Content Text */}
                <div className="relative z-10 w-full mt-auto mb-8">
                    <h4 className="text-white font-display font-bold text-lg mb-1 leading-tight group-hover:text-primary transition-colors duration-300">
                        {name}
                    </h4>
                    <div className={`h-0.5 w-8 mx-auto bg-gradient-to-r ${color} mb-3 opacity-50 group-hover:w-16 transition-all duration-300`}></div>
                    <p className="text-primary text-xs font-bold tracking-widest uppercase mb-1">
                        {role}
                    </p>
                    {division && (
                        <p className="text-gray-500 text-[10px] uppercase tracking-wider font-medium">
                            {division}
                        </p>
                    )}
                </div>
            </div>
        </ElectricBorderCard>
    );
};

export default MemberCard;
