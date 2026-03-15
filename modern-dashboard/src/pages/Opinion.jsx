import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import { 
    ArrowRight, ArrowLeft, Home, Landmark, Globe, 
    TrendingUp, Newspaper, Scale, ShieldCheck, Zap
} from 'lucide-react';

const ArticleWidget = ({ title, subtitle, date, category, path, icon: Icon, colorClass }) => {
    const navigate = useNavigate();
    return (
        <NeumorphicPanel 
            className="group p-8 bg-[#12161f]/60 hover:bg-[#12161f]/80 transition-all duration-500 border-white/5 cursor-pointer"
            onClick={() => navigate(path)}
        >
            <div className="flex flex-col h-full space-y-6">
                <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${colorClass}`}>
                        <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{date}</span>
                </div>
                
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${colorClass.replace('text-', 'bg-')}`} />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{category}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-[#F76B1C] transition-colors italic">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium line-clamp-2">
                        {subtitle}
                    </p>
                </div>

                <div className="pt-4 flex items-center gap-2 text-[#F76B1C] group-hover:gap-4 transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest">Leer Análisis Completo</span>
                    <ArrowRight size={14} />
                </div>
            </div>
        </NeumorphicPanel>
    );
};

const Opinion = () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto space-y-8 animate-fade-in py-6 px-4">
                
                {/* Simplified Navigation Bar */}
                <div className="flex justify-between items-center bg-[#12161f]/80 p-3 rounded-2xl border border-white/5 shadow-xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-5 py-2 bg-slate-800/50 hover:bg-[#F76B1C] text-slate-300 hover:text-white rounded-xl transition-all border border-slate-700 hover:border-[#F76B1C] text-[10px] font-black uppercase tracking-widest group"
                    >
                        <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                        Volver
                    </button>
                    
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center justify-center p-2.5 bg-sky-900/30 hover:bg-sky-500 text-sky-400 hover:text-white rounded-xl transition-all border border-sky-500/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] group"
                    >
                        <Home size={16} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Founder's Vision Hero Card */}
                <NeumorphicPanel 
                    radiance="ramux"
                    className="p-10 md:p-20 relative overflow-hidden group/hero border-white/10 flex flex-col items-center text-center"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(247,107,28,0.08)_0%,_transparent_70%)] pointer-events-none" />
                    
                    <div className="relative z-10 space-y-10 max-w-5xl flex flex-col items-center">
                        <div className="space-y-4 flex flex-col items-center">
                            <div className="flex items-center gap-4">
                                <div className="h-px w-12 bg-[#F76B1C]" />
                                <span className="text-xs font-black text-[#F76B1C] uppercase tracking-[0.4em]">Founder's Vision</span>
                                <div className="h-px w-12 bg-[#F76B1C]" />
                            </div>
                            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase italic whitespace-nowrap">
                                Opinión y <span className="bg-gradient-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent">Coyuntura</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 font-bold uppercase tracking-tight italic opacity-80">
                                La verdad entre líneas.
                            </p>
                        </div>
                        
                        <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md max-w-3xl relative overflow-hidden group/desc">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#F76B1C]/5 to-transparent opacity-0 group-hover/desc:opacity-100 transition-opacity duration-700" />
                            <p className="relative z-10 text-lg md:text-xl text-slate-200 leading-relaxed font-medium">
                                Decodificando el mercado. Análisis técnico y sin filtros sobre economía, tecnología y el futuro del trabajo. Desglosamos la coyuntura para encontrar la ventaja asimétrica detrás de cada titular.
                            </p>
                        </div>
                    </div>
                </NeumorphicPanel>

                {/* Articles Grid / Index */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 px-2">
                        <div className="p-2 bg-sky-500/10 rounded-xl border border-sky-500/20">
                            <Newspaper className="text-sky-400" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Análisis Recientes</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                        {/* Article 1: La Nueva Era del Trabajo */}
                        <ArticleWidget 
                            title="La Nueva Era del Trabajo en Argentina"
                            subtitle="Análisis técnico de la Ley de Modernización Laboral. Pros, contras e impacto estructural en el mercado."
                            date="15 MAR 2026"
                            category="Radar Laboral"
                            path="/opinion/laboral"
                            icon={Scale}
                            colorClass="text-[#F76B1C]"
                        />

                        {/* Placeholder for future articles */}
                        <NeumorphicPanel className="p-8 bg-[#12161f]/30 border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px] opacity-40">
                            <div className="p-4 rounded-full bg-white/5">
                                <Landmark size={32} className="text-slate-600" />
                            </div>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Próximamente</p>
                        </NeumorphicPanel>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Opinion;
