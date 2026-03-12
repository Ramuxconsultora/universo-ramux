import React from 'react';

const GlassPanel = ({ children, className = '', hoverEffect = true, ...props }) => {
    // Optimized Glassmorphism for macOS Safari/Chrome
    const baseClasses = "bg-white/5 backdrop-blur-md border border-violet-500/20 shadow-xl transition-all duration-300 rounded-2xl";
    const hoverClasses = hoverEffect ? "hover:border-violet-500/50 hover:scale-[1.01] hover:shadow-violet-500/20 hover:bg-white/10" : "";

    return (
        <div
            className={`${baseClasses} ${hoverClasses} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassPanel;
