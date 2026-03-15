import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Menu, X } from 'lucide-react';
import { useNav } from '../../contexts/NavContext';

const NavigationBar = ({ showBack = true, showHome = true, showMenu = true }) => {
    const navigate = useNavigate();
    const { isMenuOpen, toggleMenu } = useNav();

    return (
        <div className="w-full flex justify-between items-center bg-[#12161f]/40 p-3 md:p-4 rounded-2xl md:rounded-3xl border border-white/5 backdrop-blur-md shadow-xl relative z-[60]">
            <div className="flex items-center">
                {showBack && (
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 md:px-6 py-2.5 bg-slate-800/50 hover:bg-[#F76B1C] text-slate-300 hover:text-white rounded-xl transition-all border border-slate-700 hover:border-[#F76B1C] text-[10px] md:text-xs font-black uppercase tracking-widest group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden xs:inline">Volver</span>
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
                {showMenu && (
                    <button
                        onClick={toggleMenu}
                        className={`flex items-center gap-3 px-4 md:px-6 py-2.5 rounded-xl transition-all border font-black text-[10px] md:text-xs uppercase tracking-[0.2em] group ${
                            isMenuOpen 
                            ? 'bg-[#F76B1C] text-white border-[#F76B1C] shadow-[0_0_20px_rgba(247,107,28,0.4)]' 
                            : 'bg-[#1a1f2b] text-slate-300 border-white/5 hover:border-sky-500/50 hover:text-white'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            {isMenuOpen ? <X size={18} /> : <Menu size={18} className="text-sky-400 group-hover:text-white transition-colors" />}
                            <span className="hidden xs:inline">Menu</span>
                        </div>
                    </button>
                )}

                {showHome && (
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center justify-center p-2.5 md:p-3 bg-sky-900/30 hover:bg-sky-500 text-sky-400 hover:text-white rounded-xl transition-all border border-sky-500/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] group"
                    >
                        <Home size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavigationBar;
