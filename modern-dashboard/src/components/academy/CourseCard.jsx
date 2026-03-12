import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import { BookOpen, PlayCircle, ShieldCheck, Activity, Cpu, Network } from 'lucide-react';

const CourseCard = ({ course, type }) => {
    const { title, desc, level, hasSimulator, isAppliedTheory, icon: Icon } = course;

    // Config per type axis
    const axisConfig = {
        finance: {
            text: 'text-sky-400',
            bg: 'bg-sky-500/10',
            borderHover: 'hover:border-sky-500/50',
            border: 'border-sky-500/20',
            gradient: 'from-[#0b172a] to-[#0f2942]', // Midnight blue
            accent: 'text-amber-400', // Gold/Green details
            badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
        },
        ai: {
            text: 'text-cyan-400',
            bg: 'bg-cyan-500/10',
            borderHover: 'hover:border-cyan-500/50',
            border: 'border-cyan-500/20',
            gradient: 'from-[#050B14] to-[#120B29]', // Dark tracking to violet
            accent: 'text-violet-400', // Violet electric
            badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
        },
        leadership: {
            text: 'text-slate-200',
            bg: 'bg-slate-500/10',
            borderHover: 'hover:border-slate-400/50',
            border: 'border-slate-500/20',
            gradient: 'from-[#1a1c23] to-[#2d303a]', // Professional grays
            accent: 'text-white',
            badge: 'bg-slate-200/20 text-slate-200 border-slate-200/30'
        }
    };

    const config = axisConfig[type] || axisConfig.finance;

    return (
        <GlassPanel
            className={`flex flex-col relative group overflow-hidden border ${config.border} bg-gradient-to-br ${config.gradient} cursor-pointer transition-all duration-300 ${config.borderHover} hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] h-full`}
            hoverEffect={true}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {Icon ? <Icon size={80} className="text-white" /> : <BookOpen size={80} className="text-white" />}
            </div>

            <div className="relative z-10 p-2 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                        {level && (
                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border bg-slate-800/50 border-white/10 text-slate-300`}>
                                {level}
                            </span>
                        )}
                        {isAppliedTheory && (
                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border ${config.badge}`}>
                                Teoría Aplicada
                            </span>
                        )}
                    </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 leading-tight ${config.accent}`}>{title}</h3>
                <p className="text-sm text-slate-400 mb-8 max-w-[90%] flex-grow">{desc}</p>

                <div className="flex flex-col gap-3 mt-auto">
                    <button className={`flex justify-center items-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm transition-all border border-white/10 hover:border-white/20 hover:bg-white/5 text-white`}>
                        <PlayCircle size={18} />
                        Ingresar al Módulo
                    </button>

                    {hasSimulator && (
                        <button className={`flex justify-center items-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm transition-all bg-sky-600 hover:bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)] border border-sky-400/50`}>
                            <Activity size={18} />
                            Entrar al Simulador
                        </button>
                    )}
                </div>
            </div>
        </GlassPanel>
    );
};

export default CourseCard;
