import React from 'react';

/**
 * NeumorphicPanel Component
 * Implements a Soft UI (Neumorphism) surface refined for a Galactic aesthetic.
 * uses deep gradients and cosmic-toned shadows.
 */
const NeumorphicPanel = ({ 
    children, 
    className = "", 
    inset = false,
    onClick,
    accent = false,
    radiance = false, // 'amber', 'blue', 'green', 'purple', 'ramux', or false
    radianceClassName = ""
}) => {
    // Base Styles
    const baseClasses = radiance ? "card-radiance radiance-container" : (inset ? "soft-panel-inset" : "soft-panel");
    const accentClass = accent ? "border-[#F76B1C]/40 shadow-[0_0_20px_rgba(247,107,28,0.15)]" : "border-white/5";
    
    return (
        <div 
            onClick={onClick}
            className={`
                ${baseClasses} 
                ${accentClass}
                ${className} 
                relative overflow-hidden
                ${onClick ? 'cursor-pointer' : ''}
            `}
        >
            {/* Radiance Overlay Effect */}
            {radiance && (
                <div 
                    className={`radiance-overlay radiance-${radiance} ${radianceClassName}`} 
                    style={{ transform: 'translate3d(0,0,0)' }} 
                />
            )}

            {/* Gloss Effect Layer (Only for non-radiance, as radiance has its own look) */}
            {!inset && !radiance && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            )}
            
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default NeumorphicPanel;
