import React from 'react';

/**
 * NeumorphicPanel Component
 * Implements a Soft UI (Neumorphism) surface using dual shadows and 
 * linear-gradient backgrounds for an extruded look.
 */
const NeumorphicPanel = ({ 
    children, 
    className = "", 
    inset = false,
    onClick,
    accent = false
}) => {
    // Base Styles according to specifications:
    // Background Gradient: 145deg, #1c2230 to #181d27
    // Shadows: Light top-left (-6px), Dark bottom-right (6px)
    // Radius: 24px
    
    const baseClasses = inset ? "soft-panel-inset" : "soft-panel";
    const accentClass = accent ? "border-[#F76B1C]/30 shadow-[0_0_15px_rgba(247,107,28,0.1)]" : "border-white/5";
    
    return (
        <div 
            onClick={onClick}
            className={`
                ${baseClasses} 
                ${accentClass}
                ${className} 
                relative overflow-hidden transition-all duration-300
                ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
            `}
        >
            {children}
        </div>
    );
};

export default NeumorphicPanel;
