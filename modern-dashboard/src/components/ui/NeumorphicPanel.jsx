import React from 'react';

/**
 * NeumorphicPanel Component
 * Implementa una superficie de Soft UI (Neumorfismo) refinada para la estética de Ramux.
 * Utiliza gradientes profundos, sombras de tonos cósmicos y capas de resplandor.
 */
const NeumorphicPanel = ({ 
    children, 
    className = "", 
    inset = false,
    onClick,
    accent = false,
    radiance = false // 'amber', 'blue', 'green', 'purple', 'ramux', o false
}) => {
    
    // Determinación de las clases base según las props
    const baseClasses = radiance 
        ? "card-radiance radiance-container" 
        : (inset ? "soft-panel-inset" : "soft-panel");

    // Clase de acento (Borde naranja Ramux)
    const accentClass = accent 
        ? "border-[#F76B1C]/40 shadow-[0_0_20px_rgba(247,107,28,0.15)]" 
        : "border-white/5";

    // Clases interactivas si el panel funciona como botón
    const interactiveClasses = onClick 
        ? 'cursor-pointer active:scale-[0.98] hover:brightness-110' 
        : '';

    // Combinación final de clases filtrando valores vacíos
    const combinedClasses = [
        baseClasses,
        accentClass,
        interactiveClasses,
        "relative overflow-hidden transition-all duration-500",
        className
    ].filter(Boolean).join(' ');

    return (
        <div 
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            className={combinedClasses}
        >
            {/* Capa de efecto de resplandor (Radiance Overlay) */}
            {radiance && (
                <div 
                    className={`radiance-overlay radiance-${radiance} absolute inset-0 pointer-events-none`} 
                    aria-hidden="true"
                />
            )}

            {/* Capa de efecto de brillo/cristal (Solo para paneles estándar) */}
            {!inset && !radiance && (
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" 
                    aria-hidden="true" 
                />
            )}
            
            {/* Contenedor de contenido con z-index alto para quedar sobre los efectos */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default NeumorphicPanel;
