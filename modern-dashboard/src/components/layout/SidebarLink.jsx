import { useNavigate, useLocation } from 'react-router-dom';
import NeumorphicPanel from '../ui/NeumorphicPanel';

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
    const isActive = location.pathname === path;

    const getIconColor = () => {
        if (isActive) return 'text-[#F76B1C]';
        switch (colorClass) {
            case 'emerald': return 'text-emerald-500/40';
            case 'amber': return 'text-amber-500/40';
            default: return 'text-slate-600';
        }
    };

    return (
        <NeumorphicPanel
            className={`group p-5 relative overflow-hidden ${isActive ? 'ring-1 ring-[#F76B1C]/20' : ''}`}
            accent={isActive}
            onClick={() => navigate(path)}
        >
            <div className="flex gap-4 items-center relative z-10">
                <div className={`p-3 rounded-2xl ${isActive ? 'bg-[#F76B1C]/10 text-[#F76B1C]' : 'bg-[#12161f] text-slate-500'} transition-all shadow-inner`}>
                    {Icon && <Icon size={20} />}
                </div>
                <div className="flex-grow">
                    <h3 className={`text-sm font-black uppercase tracking-wider transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {title}
                    </h3>
                    {subtitle && <p className="text-xs text-slate-500 mt-1 font-medium leading-tight">{subtitle}</p>}
                    
                </div>

                {/* Left Side Flap Badge (Hover Revealed) */}
                {badge && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-20 overflow-hidden">
                        <div className="transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out bg-[#F76B1C] text-white text-[7px] font-black px-2 py-1.5 rounded-r-lg shadow-lg uppercase tracking-[0.15em] whitespace-nowrap ring-1 ring-black/10">
                            {badge}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Subtle glow for active state */}
            {isActive && <div className="absolute inset-0 bg-[#F76B1C]/5 pointer-events-none" />}
        </NeumorphicPanel>
    );
};

export default SidebarLink;
