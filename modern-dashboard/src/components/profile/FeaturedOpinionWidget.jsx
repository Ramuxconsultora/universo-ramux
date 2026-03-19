import React from 'react';
import { ArrowRight, Scale, Clock } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import { useNavigate } from 'react-router-dom';

const FeaturedOpinionWidget = () => {
    const navigate = useNavigate();

    // Latest opinion data (matched with Opinion.jsx)
    const latestOpinion = {
        title: "La Nueva Era del Trabajo en Argentina",
        subtitle: "Análisis técnico de la Ley de Modernización Laboral. Pros, contras e impacto estructural en el mercado.",
        date: "15 MAR 2026",
        path: "/opinion/laboral",
        category: "Radar Laboral"
    };

    return (
        <GlassPanel 
            className="p-8 md:p-12 relative overflow-hidden group cursor-pointer border-white/10 hover:border-[#F76B1C]/30 transition-all duration-700"
            onClick={() => navigate(latestOpinion.path)}
        >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F76B1C]/5 blur-[80px] group-hover:bg-[#F76B1C]/10 transition-all" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-grow space-y-6 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                        <div className="px-3 py-1 rounded-full bg-[#F76B1C]/10 border border-[#F76B1C]/20 text-[#F76B1C] text-[10px] font-black uppercase tracking-widest">
                            {latestOpinion.category}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Clock size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{latestOpinion.date}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter leading-[0.9] uppercase group-hover:text-[#F76B1C] transition-colors">
                            {latestOpinion.title}
                        </h3>
                        <p className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed max-w-2xl">
                            {latestOpinion.subtitle}
                        </p>
                    </div>

                    <div className="pt-4 flex justify-center md:justify-start">
                        <button className="flex items-center gap-3 text-[#F76B1C] font-black text-[11px] uppercase tracking-[0.2em] group-hover:gap-6 transition-all">
                            Leer Análisis Coyuntural <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-2xl">
                        <Scale size={48} className="text-[#F76B1C]" />
                    </div>
                </div>
            </div>
        </GlassPanel>
    );
};

export default FeaturedOpinionWidget;
