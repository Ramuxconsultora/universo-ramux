import React from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { BookOpen, PlayCircle, ShieldCheck, Activity, Cpu, Network, Zap, ExternalLink } from 'lucide-react';

const CourseCard = ({ course, type }) => {
    const { title, desc, level, hasSimulator, isAppliedTheory, icon: Icon } = course;

    // Config per type axis - Mapped to platform brand colors
    const axisConfig = {
        finance: {
            radiance: 'golden',
            badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
        },
        ai: {
            radiance: 'blue',
            badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20'
        },
        leadership: {
            radiance: 'violet',
            badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20'
        }
    };

    const config = axisConfig[type] || axisConfig.finance;

    return (
        <NeumorphicPanel
            radiance={config.radiance}
            className="flex flex-col relative group overflow-hidden h-full p-8 transition-transform duration-500 hover:scale-[1.02] bg-[#1a1f2b]/40 backdrop-blur-md"
        >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                {Icon ? <Icon size={100} className="text-white" /> : <BookOpen size={100} className="text-white" />}
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-wrap gap-2">
                        {level && (
                            <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase border bg-[#12161f] border-white/5 text-slate-400 tracking-widest">
                                {level}
                            </span>
                        )}
                        {isAppliedTheory && (
                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border tracking-widest ${config.badge}`}>
                                Teoría Aplicada
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4 flex-grow mb-8">
                    <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight group-hover:text-[#F76B1C] transition-colors duration-500">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        {desc}
                    </p>
                </div>

                <div className="space-y-3 mt-auto pt-6 border-t border-white/5">
                    <button className="flex items-center justify-center gap-3 w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 hover:border-white/20 transition-all font-black text-[10px] uppercase tracking-[0.2em] group/btn">
                        <PlayCircle size={16} className="text-slate-400 group-hover/btn:text-white" />
                        Ingresar al Módulo
                        <ExternalLink size={12} className="opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                    </button>

                    {hasSimulator && (
                        <button className="flex items-center justify-center gap-3 w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(14,165,233,0.3)] border border-sky-400/50 hover:scale-[1.02] transition-all group/sim">
                            <Activity size={16} className="text-sky-200 group-hover/sim:animate-pulse" />
                            Entrar al Simulador
                        </button>
                    )}
                </div>
            </div>
        </NeumorphicPanel>
    );
};

export default CourseCard;
