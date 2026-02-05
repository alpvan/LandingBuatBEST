import React from 'react';
import { User } from 'lucide-react';

interface MemberCardProps {
    name: string;
    role: string;
    division?: string;
    image?: string;
    color?: string;
    delay?: number;
}

const MemberCard: React.FC<MemberCardProps> = ({
    name,
    role,
    division,
    image,
    color = "from-orange-500 to-orange-400",
    delay = 0
}) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 w-48 hover:-translate-y-1">
            {/* Circular Avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            console.error('Failed to load image:', image);
                        }}
                    />
                ) : (
                    <User className="w-10 h-10 text-gray-400" />
                )}
            </div>

            {/* Content Text */}
            <div className="text-center">
                <h4 className="text-gray-900 font-semibold text-sm mb-2 leading-tight">
                    {name}
                </h4>
                <p className="text-orange-500 text-xs font-bold tracking-wide uppercase mb-1">
                    {role}
                </p>
                {division && (
                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                        {division}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MemberCard;
