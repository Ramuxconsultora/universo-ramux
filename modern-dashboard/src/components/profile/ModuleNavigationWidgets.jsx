import React from 'react';
import { Search, Landmark, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ModuleNavigationWidgets = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Radar Laboral Widget */}
            <div 
                onClick={() => navigate('/radar-laboral')}
                className="p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 cursor-pointer group hover:from-amber-500/20 hover:to-orange-500/20 transition-all relative overflow-hidden flex flex-col justify-between min-h-[280px]"
            >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 blur-[60px] group-hover:bg-amber-500/20 transition-all" />
                
                <div className="relative z-10 flex justify-between items-start">
                    <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/30">
                        <Search size={28} className="text-amber-500" />
                    </div>
                    <ArrowUpRight size={24} className="text-amber-500/40 group-hover:text-amber-500 transition-colors" />
                </div>

                <div className="relative z-10 space-y-2 mt-8">
                    <h5 className="text-3xl font-black text-white tracking-tighter italic uppercase leading-none">Radar Laboral</h5>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-[200px]">Consulta reformas vigentes de Argentina adaptadas a tu perfil.</p>
                </div>

                <div className="relative z-10 pt-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-black uppercase tracking-widest group-hover:bg-amber-500/20 transition-all">
                        Consultar Ahora
                    </span>
                </div>
            </div>

            {/* Capital & Wealth Widget */}
            <div 
                onClick={() => navigate('/capital-wealth')}
                className="p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-sky-500/10 to-indigo-500/10 border border-sky-500/20 cursor-pointer group hover:from-sky-500/20 hover:to-indigo-500/20 transition-all relative overflow-hidden flex flex-col justify-between min-h-[280px]"
            >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 blur-[60px] group-hover:bg-sky-500/20 transition-all" />
                
                <div className="relative z-10 flex justify-between items-start">
                    <div className="p-4 rounded-2xl bg-sky-500/20 border border-sky-500/30">
                        <Landmark size={28} className="text-sky-500" />
                    </div>
                    <ArrowUpRight size={24} className="text-sky-500/40 group-hover:text-sky-500 transition-colors" />
                </div>

                <div className="relative z-10 space-y-2 mt-8">
                    <h5 className="text-3xl font-black text-white tracking-tighter italic uppercase leading-none">Capital & Wealth</h5>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-[200px]">Gestiona tus inversiones y planifica tu libertad financiera.</p>
                </div>

                <div className="relative z-10 pt-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-500 text-[9px] font-black uppercase tracking-widest group-hover:bg-sky-500/20 transition-all">
                        Gestionar Patrimonio
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ModuleNavigationWidgets;
