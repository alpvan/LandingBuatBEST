import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative group p-2.5 rounded-xl bg-white/10 hover:bg-white/20 
                 transition-all duration-300 hover:scale-105 overflow-hidden"
            aria-label="Toggle theme"
        >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-yellow-400/20 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

            {/* Icon container with rotation animation */}
            <div className="relative w-5 h-5">
                <Sun
                    className={`absolute inset-0 w-5 h-5 text-yellow-400 transition-all duration-500 
                     ${theme === 'light'
                            ? 'rotate-0 opacity-100 scale-100'
                            : 'rotate-180 opacity-0 scale-50'}`}
                />
                <Moon
                    className={`absolute inset-0 w-5 h-5 text-blue-300 transition-all duration-500 
                     ${theme === 'dark'
                            ? 'rotate-0 opacity-100 scale-100'
                            : '-rotate-180 opacity-0 scale-50'}`}
                />
            </div>

            {/* Hover ring effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-primary/0 
                      group-hover:border-primary/30 transition-all duration-300" />
        </button>
    );
};

export default ThemeToggle;
