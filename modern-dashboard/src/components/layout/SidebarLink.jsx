import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlassPanel from '../ui/GlassPanel';

// Stateless Component for Sidebar Navigation Item
const SidebarLink = ({
    title,
    subtitle,
    path,
    icon: Icon,
    badge,
    badgeColor = "amber",
    colorClass = "sky"
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Simple active state check
    const isActive = location.pathname === path;

    // Mapping colors dynamically is tricky in Tailwind if constructed dynamically, 
    // so we use predefined Safe sets, or handle the specific ones passed.
    // Assuming colorClass is something like 'sky', 'emerald', 'violet'
    const getThemeClasses = () => {
        switch (colorClass) {
            case 'emerald':
                return {
                    text: 'text-emerald-400',
                    borderHover: 'hover:border-emerald-400',
                    borderActive: 'border-emerald-500/50',
                    bgActive: 'bg-emerald-500/10'
                };
            case 'violet':
                return {
                    text: 'text-violet-400',
                    borderHover: 'hover:border-violet-400',
                    borderActive: 'border-violet-500/50',
                    bgActive: 'bg-violet-500/10'
                };
            case 'fuchsia':
                return {
                    text: 'text-fuchsia-400',
                    borderHover: 'hover:border-fuchsia-400',
                    borderActive: 'border-fuchsia-500/50',
                    bgActive: 'bg-fuchsia-500/10'
                };
            case 'sky':
            default:
                return {
                    text: 'text-sky-400',
                    borderHover: 'hover:border-sky-400',
                    borderActive: 'border-sky-500/50',
                    bgActive: 'bg-sky-500/10'
                };
        }
    };

    const getBadgeClasses = () => {
        switch (badgeColor) {
            case 'emerald': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'violet': return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
            case 'sky': return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
            case 'amber':
            default: return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
        }
    };

    const theme = getThemeClasses();
    const badgeStyle = getBadgeClasses();

    return (
        <GlassPanel
            className={`group relative overflow-hidden cursor-pointer transition-all duration-300 ${theme.borderHover} border-white/5 p-6 ${isActive ? `${theme.borderActive} ${theme.bgActive}` : ''}`}
            hoverEffect={true}
            onClick={() => navigate(path)}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {Icon && <Icon size={48} className={theme.text} />}
            </div>
            <div className="relative z-10">
                {badge && (
                    <div className="flex justify-between items-start mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeStyle}`}>
                            {badge}
                        </span>
                    </div>
                )}
                {!badge && <div className="mt-1"></div>}

                <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                {subtitle && <p className="text-xs text-slate-300 mb-1 leading-relaxed">{subtitle}</p>}

            </div>
        </GlassPanel>
    );
};

export default SidebarLink;
