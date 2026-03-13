import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassPanel from '../ui/GlassPanel';
import { MessageCircle, Briefcase } from 'lucide-react';
import ramuxSello from '../../assets/ramux-sello.png';

const WelcomeHero = () => {
    const navigate = useNavigate();

    return (
        <GlassPanel className="relative overflow-hidden group mb-6 border-sky-500/30 min-h-[250px] flex items-center justify-center p-6 shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-[#02050A]">

            {/* Matrix-like Hacker Grid Background (Brand Colors: Sky & Amber) */}
            <div className="absolute inset-0 border border-sky-900/30 bg-[linear-gradient(to_right,#0ea5e911_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e911_1px,transparent_1px)] bg-[size:30px_30px] opacity-70"></div>

            {/* Holographic Orbs Removed for Performance */}

            {/* Vertical Data Streams (Matrix effect simulation) */}
            <div className="absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-transparent via-sky-400/50 to-transparent opacity-30 animate-pulse"></div>
            <div className="absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-transparent via-amber-500/50 to-transparent opacity-20"></div>
            <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-sky-400/50 to-transparent opacity-40"></div>
            <div className="absolute top-0 right-[40%] w-px h-full bg-gradient-to-b from-transparent via-amber-500/50 to-transparent opacity-20 animate-pulse"></div>

            {/* Content Overlaid */}
            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto mt-2 px-4">

                {/* Static Title */}
                <div className="w-full relative mb-6">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-widest flex flex-col items-center justify-center gap-1.5 md:gap-3 uppercase px-4 text-center">
                        VAMOS A POTENCIAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-500">TU MUNDO.</span>
                    </h1>
                </div>

                {/* Description - DOS Terminal Style */}
                <div className="p-4 bg-[#010a17]/80 rounded-lg border border-sky-500/30 shadow-[inset_0_0_20px_rgba(14,165,233,0.15)] mb-8 max-w-3xl">
                    <p className="text-sky-300 font-mono text-xs sm:text-sm md:text-base tracking-wide flex text-left leading-relaxed">
                        <span className="mr-2">&gt;</span>
                        <span>
                            Ramux es un ecosistema de consultoría estratégica y formación avanzada diseñado para liderar la transformación del conocimiento en la era digital. Nuestra misión es dotar a profesionales y empresas de las herramientas críticas para navegar los mercados actuales, integrando la gestión de capital humano, el comercio internacional y las finanzas estratégicas.<span className="animate-[pulse_1s_ease-in-out_infinite] ml-1">_</span>
                        </span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <button
                        onClick={() => navigate('/servicios')}
                        className="flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full transition-all duration-300 border border-white/20 hover:border-sky-400/50 hover:scale-105 w-full sm:w-auto justify-center"
                    >
                        <Briefcase size={20} className="text-sky-400" />
                        <span className="tracking-wide uppercase text-sm">Nuestros Servicios</span>
                    </button>

                    <a
                        href="https://wa.me/message/WATOKPKLCBMPK1"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all duration-300 glow-button shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-400/50 hover:scale-105 w-full sm:w-auto justify-center"
                    >
                        <MessageCircle size={22} className="text-white" />
                        <span className="tracking-wide uppercase text-sm">Contactanos</span>
                    </a>
                </div>

            </div>
            {/* Local effects removed for performance */}

        </GlassPanel>
    );
};

export default WelcomeHero;
