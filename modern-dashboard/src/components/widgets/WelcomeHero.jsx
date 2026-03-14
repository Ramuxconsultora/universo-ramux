import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { MessageCircle, Briefcase, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

const WelcomeHero = () => {
    const navigate = useNavigate();

    return (
        <NeumorphicPanel className="relative p-10 md:p-12 overflow-hidden mb-8">
            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h1 className="text-[28px] md:text-[46px] font-black text-white mb-4 leading-[1.1] tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(247,107,28,0.2)]">
                    VAMOS A POTENCIAR <br /> 
                    <span className="text-[#F76B1C] drop-shadow-[0_0_12px_rgba(247,107,28,0.35)]">TU MUNDO</span>.
                </h1>

                {/* Styled Description (Justified & Balanced Contrast) */}
                <div className="p-6 bg-black/50 rounded-3xl border border-white/10 mb-8 backdrop-blur-md shadow-inner max-w-2xl mx-auto">
                    <p 
                        className="text-sm md:text-base leading-relaxed text-justify"
                        style={{ color: '#cbd5e1', fontWeight: '500' }}
                    >
                        Ramux es un ecosistema de consultoría estratégica y formación avanzada diseñado para liderar la transformación del conocimiento en la era digital. Nuestra misión es dotar a profesionales y empresas de las herramientas críticas para navegar los mercados actuales, integrando la gestión de capital humano, el comercio internacional y las finanzas estratégicas.
                    </p>
                </div>

                <div className="flex flex-wrap gap-6 justify-center">
                    <button 
                        onClick={() => navigate('/servicios')}
                        className="px-10 py-4 bg-[#F76B1C] text-white rounded-2xl font-black hover:bg-[#ff7b2b] transition-all shadow-xl shadow-[#F76B1C]/30 active:scale-95 uppercase text-xs tracking-[0.2em] flex items-center gap-2 group"
                    >
                        <Briefcase size={18} className="group-hover:rotate-12 transition-transform" />
                        NUESTROS SERVICIOS
                    </button>
                    <a 
                        href="https://wa.me/message/WATOKPKLCBMPK1"
                        target="_blank"
                        rel="noreferrer"
                        className="px-10 py-4 bg-[#0d1117] text-slate-300 rounded-2xl font-black border border-[#F76B1C]/40 hover:text-white hover:border-[#F76B1C] transition-all shadow-lg active:scale-95 flex items-center gap-2 no-underline uppercase text-xs tracking-[0.2em] group"
                    >
                        <MessageCircle size={18} className="group-hover:scale-110 transition-transform" /> 
                        CONTÁCTANOS
                    </a>
                </div>
            </div>
        </NeumorphicPanel>
    );
};

export default WelcomeHero;
