import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import { 
    Heart, 
    ArrowLeft, 
    Home, 
    Unlock, 
    ShieldCheck,
    Users,
    Globe,
    Zap
} from 'lucide-react';

const Compromiso = () => {
    const navigate = useNavigate();

    // Force scroll to top on mount
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <div className="max-w-6xl mx-auto space-y-12 animate-fade-in py-6 px-4">
                
                {/* Navigation Bar */}
                <div className="flex justify-between items-center bg-[#12161f]/40 p-4 rounded-3xl border border-white/5 shadow-xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-slate-800/50 hover:bg-[#F76B1C] text-slate-300 hover:text-white rounded-xl transition-all border border-slate-700 hover:border-[#F76B1C] text-xs font-black uppercase tracking-widest group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Volver
                    </button>
                    
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center justify-center p-3 bg-cyan-900/30 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-xl transition-all border border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] group"
                    >
                        <Home size={18} className="group-hover:translate-y-[-2px] transition-transform" />
                    </button>
                </div>

                {/* Hero Header Section */}
                <div className="relative group/header flex flex-col items-center text-center py-8">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[24px] pointer-events-none group-hover/header:bg-cyan-500/10 transition-colors duration-1000" />
                    
                    <div className="flex flex-col items-center space-y-6 relative z-10 w-full text-center">
                        <div className="flex items-center gap-3 px-5 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20 w-fit mx-auto">
                            <Heart size={16} className="text-cyan-400" />
                            <span className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.3em]">Propósito Ramux</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase max-w-5xl mx-auto">
                            Compromiso <span className="text-cyan-400">Social</span>
                        </h1>
                        
                        <div className="h-1.5 w-24 bg-cyan-500/30 rounded-full mx-auto" />
                    </div>
                </div>

                {/* Aspirational Manifesto */}
                <NeumorphicPanel 
                    radiance="cyan" 
                    className="p-10 md:p-14 relative overflow-hidden group/manifesto border-t border-cyan-500/10"
                >
                    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                        <p className="text-2xl md:text-3xl font-black text-white leading-tight uppercase tracking-tight italic">
                            "No solo analizamos el mercado, ayudamos a construir el terreno donde caminas."
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed font-medium">
                            En <span className="text-cyan-400 font-black">Compromiso Ramux</span>, nuestra visión trasciende los gráficos para enfocarse en el tejido social: 
                            transparencia, justicia y el desarrollo de una ciudadanía con herramientas para el futuro.
                        </p>
                    </div>
                    <Globe className="absolute -right-16 -bottom-16 text-cyan-500/5 rotate-12" size={320} />
                </NeumorphicPanel>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: ShieldCheck, title: "Transparencia", desc: "Soberanía informativa para decisiones libres." },
                        { icon: Users, title: "Comunidad", desc: "Fortaleciendo el tejido social desde la base." },
                        { icon: Zap, title: "Futuro", desc: "Herramientas técnicas para la nueva ciudadanía." }
                    ].map((pilar, idx) => (
                        <NeumorphicPanel key={idx} className="p-8 bg-[#12161f]/40 hover:bg-[#12161f]/60 transition-all duration-500 group">
                            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 w-fit mb-6 group-hover:translate-y-[-4px] transition-transform">
                                <pilar.icon className="text-cyan-400" size={24} />
                            </div>
                            <h3 className="text-lg font-black text-white uppercase mb-2">{pilar.title}</h3>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed">{pilar.desc}</p>
                        </NeumorphicPanel>
                    ))}
                </div>

                {/* Hype Card - Access Inminente */}
                <div className="pt-8">
                    <NeumorphicPanel 
                        className="p-10 md:p-16 bg-[#0a0e1a] border border-cyan-500/20 relative overflow-hidden group/hype"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none group-hover/hype:bg-cyan-500/10 transition-colors duration-1000" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                            <div className="md:col-span-8 space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase">
                                        El Código de la <br/>
                                        <span className="text-[#F76B1C]">Nueva Ciudadanía.</span>
                                    </h2>
                                    <p className="text-xl text-slate-300 leading-relaxed font-medium max-w-2xl">
                                        Estamos decodificando las reglas del juego para que el futuro no te tome por sorpresa. Una nueva capa de transparencia está llegando a Ramux para equilibrar la balanza.
                                    </p>
                                </div>
                                
                                <button 
                                    disabled
                                    className="px-10 py-4 bg-slate-800/50 text-slate-500 font-black rounded-2xl border border-white/5 cursor-not-allowed uppercase text-xs tracking-[0.3em]"
                                >
                                    [ Acceso Inminente ]
                                </button>
                            </div>
                            
                            <div className="md:col-span-4 flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-cyan-500/20 blur-[30px] rounded-full animate-pulse" />
                                    <div className="w-32 h-32 md:w-48 md:h-48 bg-[#12161f] rounded-[3rem] border border-cyan-500/30 flex items-center justify-center shadow-2xl relative z-10 group-hover/hype:translate-y-[-8px] transition-transform duration-700">
                                        <Unlock size={64} className="text-cyan-400" />
                                    </div>
                                    <ShieldCheck className="absolute -top-6 -right-6 text-[#F76B1C]/40 rotate-12" size={48} />
                                </div>
                            </div>
                        </div>
                    </NeumorphicPanel>
                </div>

                {/* Footer Signature */}
                <div className="flex flex-col items-center py-12">
                    <div className="h-px w-24 bg-white/5 mb-8" />
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Construyendo Visión • Ramux 2026</p>
                </div>
            </div>
        </Layout>
    );
};

export default Compromiso;
