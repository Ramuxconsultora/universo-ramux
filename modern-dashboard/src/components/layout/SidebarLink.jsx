import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { useNavigation } from '../../contexts/NavigationContext';

const SidebarLink = ({
    title,
    subtitle,
    path,
    icon: Icon,
    badge,
    radiance = 'silver', // 'amber', 'blue', 'green', 'purple', 'violet', 'golden', 'silver', 'orange'
    isActive = false
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { closeMenu } = useNavigation();

    // Determinamos si el link es la ruta actual
    const currentActive = location.pathname === path || isActive;

    const handleNavigation = () => {
        navigate(path);
        // Cerramos el sidebar automáticamente al navegar (vital para móvil)
        if (closeMenu) closeMenu();
    };

    return (
        <div className="relative mb-3 last:mb-0">
            <NeumorphicPanel
                radiance={radiance || 'silver'}
                className={`group p-4 relative overflow-hidden transition-all duration-500 cursor-pointer 
                    ${currentActive 
                        ? 'ring-1 ring-white/20 opacity-100 shadow-[0_0_25px_rgba(255,255,255,0.05)]' 
                        : 'opacity-60 hover:opacity-100 hover:translate-x-1'
                    }`}
                radianceClassName={`transition-opacity duration-700 ${currentActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                onClick={handleNavigation}
            >
                <div className="flex gap-4 items-center relative z-10">
                    {/* Icon Container */}
                    <div className={`p-2.5 rounded-xl transition-all duration-500 shadow-inner
                        ${currentActive 
                            ? 'bg-white/10 text-white scale-110' 
                            : 'bg-black/40 text-slate-500 group-hover:text-white group-hover:bg-white/5'
                        }`}>
                        {Icon && <Icon size={18} className={currentActive ? 'animate-pulse' : ''} />}
                    </div>

                    {/* Text Content */}
                    <div className="flex-grow min-w-0">
                        <h3 className={`text-[11px] font-black uppercase tracking-[0.15em] transition-colors leading-none
                            ${currentActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                            {title}
                        </h3>
                        {subtitle && (
                            <p className="text-[9px] text-slate-500 mt-1.5 font-bold leading-tight uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity truncate">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Right-side Active Indicator */}
                    {currentActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F76B1C] shadow-[0_0_10px_#F76B1C]" />
                    )}
                </div>

                {/* Left Side Flap Badge (Hover Revealed) */}
                {badge && (
                    <div className="absolute left-0 top-0 h-full pointer-events-none z-20 overflow-hidden">
                        <div className="h-full flex items-center transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out">
                            <div className="bg-[#F76B1C] text-black text-[7px] font-black px-2 py-2 rounded-r-lg shadow-xl uppercase tracking-[0.15em] whitespace-nowrap ring-1 ring-white/10 italic">
                                {badge}
                            </div>
                        </div>
                    </div>
                )}
            </NeumorphicPanel>

            {/* Subtle Active Glow Backdrop */}
            {currentActive && (
                <div className="absolute inset-0 bg-white/[0.02] blur-xl -z-10 rounded-3xl" />
            )}
        </div>
    );
};

export default SidebarLink;
