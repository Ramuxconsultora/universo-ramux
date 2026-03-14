import React from 'react';

const GlassPanel = ({ children, className = '', hoverEffect = true, ...props }) => {
    // 1. Cambiamos 'transition-all' por 'transition' (Tailwind lo optimiza por debajo)
    // 2. Mantenemos el backdrop-blur bajo (4px) que es excelente para rendimiento
    const baseClasses = "bg-white/5 backdrop-blur-[4px] border border-violet-500/10 shadow-xl transition duration-300 rounded-2xl";
    
    // 3. Añadimos 'transform-gpu' para que la escala sea manejada eficientemente por hardware
    // solo cuando ocurre el hover, sin bloquear la memoria constantemente.
    const hoverClasses = hoverEffect 
        ? "hover:border-violet-500/40 hover:scale-[1.005] hover:shadow-violet-500/20 hover:bg-white/10 transform-gpu" 
        : "";

    return (
        <div
            className={`${baseClasses} ${hoverClasses} ${className}`}
            // Eliminamos el style en línea con willChange
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassPanel;
