import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { MessageCircle, Briefcase, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

const WelcomeHero = () => {
    const navigate = useNavigate();

    return (
        <NeumorphicPanel
            radiance="ramux"
            className="w-full p-8 md:p-12 group/card relative"
        >
            <div className="relative z-20 flex flex-col gap-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="flex-grow space-y-6">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black text-[#F76B1C] uppercase tracking-[0.4em]">Ecosistema Estratégico</span>
                            <h1 className="text-[40px] md:text-[52px] lg:text-[64px] font-black text-white leading-[0.9] tracking-tighter uppercase">
                                <span className="block drop-shadow-2xl">VAMOS A POTENCIAR</span>
                                <span className="block text-white/30 group-hover/card:text-[#F76B1C] transition-colors duration-700 cursor-default">TU MUNDO</span>
                            </h1>
                        </div>
                        
                        <p className="text-base md:text-lg lg:text-xl leading-relaxed text-slate-100 font-medium max-w-3xl border-l-2 border-[#F76B1C]/30 pl-6 py-1">
                            <span className="text-white font-black group-hover:text-[#F76B1C] transition-colors duration-500">Ramux</span> es el motor de cambio para organizaciones que buscan rediseñar su operatividad. A través de un modelo híbrido de consultoría y formación, impactamos directamente en la productividad y la cultura organizacional, estableciendo nuevas formas de hacer las cosas donde el conocimiento se convierte en resultados tangibles y sostenibles.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center mt-10">
                    <button
                        onClick={() => navigate('/servicios')}
                        className="w-full sm:w-auto px-6 md:px-12 py-3.5 md:py-4.5 bg-white text-black rounded-2xl font-black hover:bg-[#F76B1C] hover:text-white transition-all active:scale-95 uppercase text-[10px] md:text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    >
                        NUESTROS SERVICIOS <span className="opacity-50">→</span>
                    </button>
                    <a
                        href="https://wa.me/message/WATOKPKLCBMPK1"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-6 md:px-12 py-3.5 md:py-4.5 bg-transparent text-white rounded-2xl font-black border border-white/10 hover:border-[#F76B1C] hover:bg-[#F76B1C]/5 transition-all active:scale-95 flex items-center justify-center gap-3 no-underline uppercase text-[10px] md:text-xs tracking-[0.2em]"
                    >
                        CONTÁCTANOS
                    </a>
                </div>

                {/* Fibonacci Ornament and Label - Positioned near title on mobile, bottom-right on desktop */}
                <div className="flex flex-col items-center group/orbits absolute top-6 right-4 sm:top-auto sm:bottom-4 sm:right-6 opacity-30 group-hover/card:opacity-100 transition-all duration-700 pointer-events-none scale-[0.35] sm:scale-75 lg:scale-100 origin-top-right sm:origin-bottom-right">
                    <div className="w-40 h-40 lg:w-48 lg:h-48 relative">
                        <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full text-white/20 group-hover/card:text-sky-400 transition-all duration-700"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <circle cx="50" cy="50" r="4.5" fill="#F76B1C" className="animate-pulse" />
                            <g className="origin-center animate-spin-slow-reverse" style={{ animationDuration: '8s' }}>
                                <circle cx="50" cy="50" r="15" strokeDasharray="30 64" strokeLinecap="round" className="text-white/20" />
                                <circle cx="65" cy="50" r="2" fill="#F76B1C" />
                            </g>
                            <g className="origin-center animate-spin-slow-reverse" style={{ animationDuration: '14s' }}>
                                <circle cx="50" cy="50" r="28" strokeDasharray="50 120" strokeLinecap="round" className="text-white/10" />
                                <circle cx="78" cy="50" r="2.5" fill="#F76B1C" />
                            </g>
                            <g className="origin-center animate-spin-slow-reverse" style={{ animationDuration: '22s' }}>
                                <circle cx="50" cy="50" r="42" strokeDasharray="80 180" strokeLinecap="round" className="text-white/10" />
                                <circle cx="92" cy="50" r="3" fill="#F76B1C" />
                            </g>
                        </svg>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 group-hover/card:text-sky-300 transition-all duration-300 font-bold mt-2 text-center whitespace-nowrap cursor-default">
                        Órbita de Fibonacci
                    </span>
                </div>
            </div>
        </NeumorphicPanel>
    );
};

export default WelcomeHero;
