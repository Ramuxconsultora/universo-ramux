import React from 'react';

const SidebarSection = ({ title, icon: Icon, children, colorClass = "text-slate-200" }) => {
    return (
        <div className="mb-10 last:mb-4 group/section">
            {/* Header de la Sección */}
            <div className="flex items-center gap-3 mb-5 px-2">
                {/* Icono con efecto de brillo suave */}
                {Icon && (
                    <div className={`p-1.5 rounded-lg bg-white/5 border border-white/5 ${colorClass} shadow-sm group-hover/section:border-white/10 transition-colors`}>
                        <Icon size={16} strokeWidth={2.5} />
                    </div>
                )}
                
                {/* Título de Sección: Refinado para la estética Ramux */}
                <h2 className={`text-[11px] font-black uppercase tracking-[0.25em] ${colorClass} italic`}>
                    {title}
                </h2>

                {/* Línea decorativa que se expande al hacer hover en la sección */}
                <div className="flex-grow h-[1px] bg-gradient-to-r from-white/10 to-transparent ml-2 group-hover/section:from-white/20 transition-all duration-500" />
            </div>

            {/* Contenedor de Links */}
            <div className="space-y-3 pl-1">
                {children}
            </div>
        </div>
    );
};

export default SidebarSection;
