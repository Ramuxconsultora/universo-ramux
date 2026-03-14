import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeumorphicPanel from '../ui/NeumorphicPanel.jsx';
import { MessageCircle, Briefcase, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

const WelcomeHero = () => {
    const navigate = useNavigate();

    return (
        <NeumorphicPanel 
            radiance="ramux" 
            className="relative p-10 md:p-14 overflow-hidden mb-8 group"
        >
            <div className="relative z-10 max-w-3xl">
                {/* Reference Icon (Top Left) */}
                <div className="w-14 h-14 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center mb-8 shadow-2xl">
                    <Sparkles size={28} className="text-[#F76B1C]" />
                </div>

                <h1 className="text-[28px] md:text-[52px] font-black text-white mb-6 leading-[1] tracking-tighter uppercase">
                    VAMOS A POTENCIAR <br /> 
                    <span className="text-white/40 group-hover:text-white transition-colors duration-700">TU MUNDO</span>.
                </h1>

                {/* Styled Description */}
                <div className="mb-10 max-w-2xl">
                    <p 
                        className="text-sm md:text-lg leading-relaxed text-left text-slate-300 font-medium"
                    >
                        Ramux es un ecosistema de consultoría estratégica y formación avanzada diseñado para liderar la transformación del conocimiento en la era digital.
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
