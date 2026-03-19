import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Menu, X } from 'lucide-react';
// Importante: Esto es lo que conecta el botón con el Sidebar
import { useNavigation } from '../../contexts/NavigationContext';

const NavigationBar = ({ showBack = true, showHome = true, showMenu = true }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Sacamos las funciones del contexto global
    const { isMenuOpen, toggleMenu } = useNavigation();

    const isDashboard = location.pathname === '/dashboard';

    return (
        <div className="w-full flex justify-between items-center bg-[#0a0a0a]/60 p-3 md:p-4 rounded-2xl md:rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-2xl relative z-[60] animate-fade-in">
            
            {/* Lado Izquierdo: Acción de Retroceso */}
            <div className="flex items-center">
                {(showBack && !isDashboard) && (
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 md:px-6 py-2.5 bg-white/5 hover:bg-[#F76B1C] text-white/60 hover:text-black rounded-xl transition-all border border-white/5 hover:border-[#F76B1C] text-[10px] md:text-xs font-black uppercase tracking-widest group italic"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden xs:inline tracking-[0.2em]">Regresar</span>
                    </button>
                )}
            </div>

            {/* Lado Derecho: Controles */}
            <div className="flex items-center gap-2 md:gap-3">
                
                {/* ESTE ES EL BOTÓN QUE ACTIVA EL SIDEBAR */}
                {showMenu && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Evita interferencias
                            toggleMenu();
                        }}
                        className={`flex items-center gap-3 px-5 md:px-7 py-2.5 rounded-xl transition-all border font-black text-[10px] md:text-xs uppercase tracking-[0.25em] group italic ${
                            isMenuOpen 
                            ? 'bg-[#F76B1C] text-black border-[#F76B1C] shadow-[0_0_30px_rgba(247,107,28,0.4)]' 
                            : 'bg-white/5 text-white/70 border-white/10 hover:border-[#F76B1C]/50'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            {isMenuOpen ? (
                                <X size={18} strokeWidth={3} />
                            ) : (
                                <Menu size={18} strokeWidth={3} className="text-[#F76B1C] group-hover:text-white transition-colors" />
                            )}
                            <span className="hidden xs:inline">{isMenuOpen ? 'Cerrar' : 'Menu'}</span>
                        </div>
                    </button>
                )}

                {showHome && (
                    <button
                        onClick={() => navigate('/dashboard')}
                        className={`flex items-center justify-center p-2.5 md:p-3 rounded-xl transition-all border group ${
                            isDashboard 
                            ? 'bg-[#F76B1C]/10 border-[#F76B1C]/30 text-[#F76B1C]' 
                            : 'bg-white/5 border-white/10 text-white/40 hover:bg-[#F76B1C] hover:text-black hover:border-[#F76B1C]'
                        }`}
                        title="Ir al inicio"
                    >
                        <Home size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavigationBar;
