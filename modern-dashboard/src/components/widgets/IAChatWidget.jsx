import React from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { Zap, Mail, ShieldCheck, Sparkles, Binary, Cpu } from 'lucide-react';

const IAChatWidget = () => {
    return (
        <NeumorphicPanel radiance="purple" className="flex flex-col h-[400px] group relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-15 transition-all duration-700 pointer-events-none">
                <Binary size={160} strokeWidth={0.5} className="text-purple-400 rotate-12" />
            </div>
            
            {/* Premium Header Tag */}
            <div className="flex justify-between items-center p-6 pb-2 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F76B1C]/10 rounded-xl border border-[#F76B1C]/20 shadow-lg shadow-[#F76B1C]/5">
                        <Zap className="text-[#F76B1C]" size={18} fill="#F76B1C" />
                    </div>
                    <div>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-0.5 block">Strategic Intelligence</span>
                        <h3 className="font-black text-white text-base tracking-tighter uppercase italic leading-none">Ramux IA Financial & Legal</h3>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20 shadow-inner">
                    <Sparkles size={10} className="text-purple-400" />
                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Premium</span>
                </div>
            </div>

            {/* Main Hero Content */}
            <div className="flex-grow flex flex-col items-center justify-center px-8 text-center relative z-10 -mt-2">
                <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-purple-500/20 blur-[30px] rounded-full scale-150 animate-pulse pointer-events-none" />
                    <Cpu size={56} strokeWidth={1} className="text-white relative z-10 opacity-90 group-hover:scale-110 transition-transform duration-700 group-hover:text-[#F76B1C]" />
                </div>

                <div className="space-y-3 max-w-sm">
                    <h2 className="text-xl md:text-2xl font-black text-white italic leading-tight tracking-tighter uppercase">
                        Potencia tus <span className="text-purple-400">decisiones</span> con IA
                    </h2>
                    <p className="text-[12px] text-slate-400 font-medium leading-relaxed line-clamp-2">
                        Análisis predictivos y procesamiento de normativas BCRA en tiempo real para el éxito empresarial.
                    </p>
                </div>

                {/* Micro Benefits Grid - Compact */}
                <div className="flex gap-2 mt-6 w-full max-w-xs">
                    <div className="flex-1 flex items-center justify-center gap-2 p-2 bg-white/5 rounded-xl border border-white/5 group-hover:border-purple-500/20 transition-all backdrop-blur-sm">
                        <ShieldCheck size={12} className="text-purple-400 shrink-0" />
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-wider">Seguridad</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-2 p-2 bg-white/5 rounded-xl border border-white/5 group-hover:border-[#F76B1C]/20 transition-all backdrop-blur-sm">
                        <Binary size={12} className="text-[#F76B1C] shrink-0" />
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-wider">Predictivo</span>
                    </div>
                </div>
            </div>

            {/* Inset Footer with CTA */}
            <div className="p-5 mt-auto bg-black/20 border-t border-white/5 relative z-10">
                <a
                    href="mailto:holaramux@gmail.com?subject=Consulta%20Servicio%20IA%20Premium%20-%20Ramux"
                    className="flex items-center justify-center gap-3 w-full py-3.5 bg-white text-black hover:bg-[#F76B1C] hover:text-white transition-all duration-300 rounded-[20px] font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(0,0,0,0.3)] group/btn active:scale-95"
                >
                    <Mail size={16} />
                    Consultar servicio
                    <span className="opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all">→</span>
                </a>
            </div>
        </NeumorphicPanel>
    );
};

export default IAChatWidget;
