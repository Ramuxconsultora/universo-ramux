import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-12 mt-20 bg-[#02040a]/60 backdrop-blur-2xl border-t border-white/5 relative z-10">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row justify-between items-center gap-10 md:gap-6">
                
                {/* Lado Izquierdo: Crédito de Marca y Tecnología */}
                <div className="flex flex-col items-center md:items-start gap-3 order-2 md:order-1">
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-1">
                        Infrastructure & Intelligence
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            Powered by <span className="text-white italic font-black uppercase tracking-tighter">Ramux Systems</span> 
                            <span className="text-white/20">|</span> 
                            <Heart 
                                className="text-orange-500 animate-pulse" 
                                size={12} 
                                fill="currentColor" 
                            />
                        </p>
                    </div>
                    <p className="text-[8px] font-bold text-white/10 uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} All Rights Reserved.
                    </p>
                </div>

                {/* Lado Derecho: Identidad del Fundador */}
                <div className="text-center md:text-right order-1 md:order-2 group">
                    <div className="relative inline-block">
                        <h4 className="text-base md:text-lg font-black text-white tracking-tighter uppercase italic group-hover:text-orange-500 transition-colors duration-500">
                            Fernando Silguero Ramirez
                        </h4>
                        <div className="h-[1px] w-0 group-hover:w-full bg-orange-500 transition-all duration-500 absolute -bottom-1 right-0" />
                    </div>
                    <p className="text-[10px] font-black text-[#F76B1C] uppercase tracking-[0.3em] mt-2 italic">
                        CEO & Founder
                    </p>
                </div>

            </div>
        </header>
    );
};

export default Footer;
