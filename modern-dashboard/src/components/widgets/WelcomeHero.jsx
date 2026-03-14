import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { MessageCircle, Briefcase, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

const WelcomeHero = () => {
    const navigate = useNavigate();

    return (
        <NeumorphicPanel 
            radiance="ramux" 
            className="relative p-10 md:p-14 overflow-hidden mb-8 group transition-all duration-500 opacity-80 hover:opacity-100"
        >
            <div className="relative z-10 max-w-3xl">
                <h1 className="text-[28px] md:text-[56px] font-black text-white mb-6 leading-[0.85] tracking-tight uppercase whitespace-nowrap">
                    VAMOS A POTENCIAR <br /> 
                    <span className="text-white/40 group-hover:text-[#F76B1C] transition-colors duration-700">TU MUNDO</span>
                    <span className="text-white/40 group-hover:text-sky-400 group-hover:animate-pulse transition-colors duration-700">.</span>
                </h1>

                {/* Styled Description */}
                <div className="mb-10 max-w-2xl">
                    <p 
                        className="text-sm md:text-lg leading-relaxed text-left text-slate-300 font-medium"
                    >
                        <span className="group-hover:text-[#F76B1C] transition-colors duration-500">Ramux</span> es el motor de cambio para organizaciones que buscan rediseñar su operatividad. A través de un modelo híbrido de consultoría y formación, impactamos directamente en la productividad y la cultura organizacional, estableciendo nuevas formas de hacer las cosas donde el conocimiento se convierte en resultados tangibles y sostenibles.
                    </p>
                </div>

                <div className="flex flex-wrap gap-6 justify-start">
                    <button 
                        onClick={() => navigate('/servicios')}
                        className="px-10 py-4 bg-white text-black rounded-2xl font-black hover:bg-slate-200 transition-all active:scale-95 uppercase text-[11px] tracking-widest flex items-center gap-2"
                    >
                        NUESTROS SERVICIOS →
                    </button>
                    <a 
                        href="https://wa.me/message/WATOKPKLCBMPK1"
                        target="_blank"
                        rel="noreferrer"
                        className="px-10 py-4 bg-transparent text-white rounded-2xl font-black border border-white/20 hover:border-white transition-all active:scale-95 flex items-center gap-2 no-underline uppercase text-[11px] tracking-widest"
                    >
                        CONTÁCTANOS
                    </a>
                </div>
            </div>
        </NeumorphicPanel>
    );
};

export default WelcomeHero;
