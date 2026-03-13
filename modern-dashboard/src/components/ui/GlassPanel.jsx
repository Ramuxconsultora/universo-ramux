import React from 'react';

const GlassPanel = ({ children, className = '', hoverEffect = true, ...props }) => {
    // Optimized Glassmorphism for macOS Safari/Chrome
    // Optimized Glassmorphism: lower blur for better scroll performance
    const baseClasses = "bg-white/5 backdrop-blur-[4px] border border-violet-500/10 shadow-xl transition-all duration-300 rounded-2xl will-change-transform";
    const hoverClasses = hoverEffect ? "hover:border-violet-500/40 hover:scale-[1.005] hover:shadow-violet-500/20 hover:bg-white/10" : "";

    return (
        <div
            className={`${baseClasses} ${hoverClasses} ${className}`}
            style={{ willChange: hoverEffect ? 'transform, border-color' : 'auto' }}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassPanel;
