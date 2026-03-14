import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { MessageCircle, Briefcase, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

const WelcomeHero = () => {
    const navigate = useNavigate();

    return (
        <NeumorphicPanel 
            radiance="ramux"
            className="w-full p-8 md:p-12 md:pb-5 group/card"
        >
            <div className="relative z-10 flex flex-col h-full">
                <h1 className="text-[26px] md:text-[52px] font-black text-white mb-6 leading-tight tracking-tighter uppercase max-w-3xl">
                    <span className="block whitespace-nowrap">VAMOS A POTENCIAR</span>
                    <span className="block text-white/40 group-hover/card:text-[#F76B1C] cursor-default whitespace-nowrap">TU MUNDO</span>
                </h1>

                {/* Styled Description */}
                <div className="mb-4 max-w-2xl">
                    <p 
                        className="text-sm md:text-lg leading-relaxed text-left text-slate-300 font-medium"
                    >
                        <span className="group-hover/card:text-[#F76B1C] transition-colors duration-500">Ramux</span> es el motor de cambio para organizaciones que buscan rediseñar su operatividad. A través de un modelo híbrido de consultoría y formación, impactamos directamente en la productividad y la cultura organizacional, estableciendo nuevas formas de hacer las cosas donde el conocimiento se convierte en resultados tangibles y sostenibles.
                    </p>
                </div>

                <div className="flex flex-row items-end justify-between gap-4 -translate-y-[3px] mb-[-23px]">
                    <div className="flex flex-row gap-4 justify-start -translate-y-[71px]">
                        <button 
                            onClick={() => navigate('/servicios')}
                            className="px-6 md:px-10 py-4 bg-white text-black rounded-2xl font-black hover:bg-slate-200 transition-all active:scale-95 uppercase text-[10px] md:text-[11px] tracking-widest flex items-center gap-2 whitespace-nowrap"
                        >
                            NUESTROS SERVICIOS →
                        </button>
                        <a 
                            href="https://wa.me/message/WATOKPKLCBMPK1"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 md:px-10 py-4 bg-transparent text-white rounded-2xl font-black border border-white/20 hover:border-white transition-all active:scale-95 flex items-center gap-2 no-underline uppercase text-[10px] md:text-[11px] tracking-widest whitespace-nowrap"
                        >
                            CONTÁCTANOS
                        </a>
                    </div>

                    {/* Fibonacci Ornament and Label */}
                    <div className="flex flex-col items-center group/orbits -translate-y-[23px]">
                        <div className="w-24 h-24 md:w-32 md:h-32 relative">
                            <svg 
                                viewBox="0 0 100 100" 
                                className="w-full h-full text-white/20 group-hover/card:text-sky-400 opacity-60 group-hover/card:opacity-100 transition-all duration-700" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.2"
                            >
                                {/* Incandescent Orange World */}
                                <circle 
                                    cx="50" cy="50" r="4.5" 
                                    fill="#F76B1C" 
                                    className="animate-pulse"
                                    style={{ filter: 'drop-shadow(0 0 6px #F76B1C)' }}
                                />

                                {/* Fibonacci Orbit 1 (Inner) - Attached Shooting Star Trail */}
                                <g className="origin-center animate-spin-slow-reverse" style={{ animationDuration: '5s' }}>
                                    <circle 
                                        cx="50" cy="50" r="15" 
                                        strokeDasharray="30 64" 
                                        strokeDashoffset="0"
                                        strokeLinecap="round" 
                                        opacity="0.6" 
                                        className="text-white/40" 
                                    />
                                    <circle cx="65" cy="50" r="2" fill="#F76B1C" />
                                </g>
                                
                                {/* Fibonacci Orbit 2 (Middle) - Attached Shooting Star Trail */}
                                <g className="origin-center animate-spin-slow-reverse" style={{ animationDuration: '8s' }}>
                                    <circle 
                                        cx="50" cy="50" r="26" 
                                        strokeDasharray="50 113" 
                                        strokeDashoffset="0"
                                        strokeLinecap="round" 
                                        opacity="0.4" 
                                        className="text-white/30" 
                                    />
                                    <circle cx="76" cy="50" r="2.5" fill="#F76B1C" />
                                </g>
                                
                                {/* Fibonacci Orbit 3 (Outer) - Attached Shooting Star Trail */}
                                <g className="origin-center animate-spin-slow-reverse" style={{ animationDuration: '13s' }}>
                                    <circle 
                                        cx="50" cy="50" r="38" 
                                        strokeDasharray="80 158" 
                                        strokeDashoffset="0"
                                        strokeLinecap="round" 
                                        opacity="0.3" 
                                        className="text-white/20" 
                                    />
                                    <circle cx="88" cy="50" r="3" fill="#F76B1C" />
                                </g>
                            </svg>
                        </div>
                        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/20 group-hover/card:text-sky-300 group-hover/card:opacity-100 transition-all duration-300 font-bold mt-1 text-center whitespace-nowrap group-hover/card:drop-shadow-[0_0_10px_rgba(125,211,252,0.8)] cursor-default">
                            Órbita de Fibonacci
                        </span>
                    </div>
                </div>
            </div>
        </NeumorphicPanel>
    );
};

export default WelcomeHero;
