import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-8 mt-12 glass-panel border-t border-white/5">
            <div className="max-w-7xl mx-auto px-8 w-full flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Left Side: Brand Credit */}
                <div className="flex items-center gap-2 order-2 md:order-1">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        Desarrollado por <span className="text-white">ramux</span> con 
                        <Heart className="text-[#fb7185] animate-heart-beat" size={14} fill="#fb7185" />
                    </p>
                </div>

                {/* Right Side: Founder Credit */}
                <div className="text-center md:text-right order-1 md:order-2">
                    <h4 className="text-sm font-black text-white tracking-tight uppercase">Fernando Silguero Ramirez</h4>
                    <p className="text-[10px] font-bold text-[#F76B1C] uppercase tracking-[0.2em] mt-1">CEO & Founder</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
