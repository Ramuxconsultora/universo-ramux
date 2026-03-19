import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import NeumorphicPanel from '../ui/NeumorphicPanel';

const NewsLock = ({ onAuthClick }) => {
  return (
    <div className="w-full py-12 px-4 relative">
      <NeumorphicPanel 
        radiance="orange" 
        className="max-w-md mx-auto p-8 text-center relative z-10 border-orange-500/20 bg-[#0a0a0a]"
      >
        <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/30">
          <Lock className="text-orange-500" size={28} />
        </div>
        
        <h2 className="text-xl font-black text-white italic uppercase tracking-tighter mb-3">
          Contenido Protegido
        </h2>
        
        <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">
          Para acceder al feed de noticias de <span className="text-orange-500">Ramux Capital</span> y análisis de mercado, debes iniciar sesión.
        </p>

        <button
          onClick={onAuthClick}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-black font-black italic uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-xs tracking-widest"
        >
          INGRESAR AHORA <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </NeumorphicPanel>
    </div>
  );
};

export default NewsLock;
