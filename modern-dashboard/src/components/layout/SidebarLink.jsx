import { useNavigate, useLocation } from 'react-router-dom';
import NeumorphicPanel from '../ui/NeumorphicPanel';

const SidebarLink = ({
    title,
    subtitle,
    path,
    icon: Icon,
    badge,
    radiance = false, // 'amber', 'blue', 'green', 'purple', 'violet', 'golden', 'silver', 'ramux'
    isActive = false
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentActive = location.pathname === path || isActive;

    return (
        <NeumorphicPanel
            radiance={radiance || 'silver'}
            className={`group p-4 relative overflow-hidden transition-all duration-500 ${currentActive ? 'ring-2 ring-white/20 opacity-100' : 'opacity-60 hover:opacity-100'}`}
            radianceClassName={`transition-opacity duration-700 ${currentActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            onClick={() => navigate(path)}
        >
            <div className="flex gap-4 items-center relative z-10">
                <div className={`p-2.5 rounded-xl transition-all duration-500 ${currentActive ? 'bg-white/10 text-white' : 'bg-[#12161f] text-slate-500 group-hover:text-white group-hover:bg-white/5'}`}>
                    {Icon && <Icon size={18} />}
                </div>
                <div className="flex-grow">
                    <h3 className={`text-[11px] font-black uppercase tracking-[0.15em] transition-colors ${currentActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                        {title}
                    </h3>
                    {subtitle && <p className="text-[10px] text-slate-500 mt-1 font-bold leading-tight uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity">{subtitle}</p>}
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
        </NeumorphicPanel>
    );
};

export default SidebarLink;
