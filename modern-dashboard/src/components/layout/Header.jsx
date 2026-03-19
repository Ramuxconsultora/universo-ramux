import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../contexts/NavigationContext';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, Bell, Search } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const { isMenuOpen, toggleMenu } = useNavigation();
    const { user } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] bg-[#02040a]/80 backdrop-blur-2xl border-b border-white/5">
            <div className="max-w-[1600px] mx-auto px-4 h-20 flex justify-between items-center">
                
                {/* LADO IZQUIERDO: Identidad */}
                <div className="flex items-center gap-8">
                    <div 
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="w-10 h-10 bg-[#F76B1C] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(247,107,28,0.3)] group-hover:scale-105 transition-transform">
                            <span className="text-black font-black text-xl italic">R</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-white font-black text-lg tracking-tighter uppercase leading-none">
                                Ramux <span className="text-[#F76B1C]">Capital</span>
                            </h1>
                            <p className="text-[8px] text-white/30 font-bold uppercase tracking-[0.4em] mt-1">
                                Strategy & Intelligence
                            </p>
                        </div>
                    </div>

                    {/* Barra de Búsqueda Minimalista (Solo desktop) */}
                    <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-64 group focus-within:border-orange-500/50 transition-all">
                        <Search size={14} className="text-white/20 group-focus-within:text-orange-500" />
                        <input 
                            type="text" 
                            placeholder="Buscar intel..." 
                            className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest text-white placeholder:text-white/20 focus:ring-0 w-full"
                        />
                    </div>
                </div>

                {/* LADO DERECHO: Usuario y Menu */}
                <div className="flex items-center gap-2 md:gap-4">
                    
                    {/* Notificaciones */}
                    <button className="hidden xs:flex w-10 h-10 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                        <Bell size={18} />
                    </button>

                    {/* Perfil de Usuario */}
                    <div 
                        onClick={() => navigate('/profile')}
                        className="flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-all group"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-[9px] font-black text-white uppercase leading-none">
                                {user?.displayName || 'Investor'}
                            </p>
                            <p className="text-[7px] font-bold text-orange-500 uppercase tracking-widest mt-1">
                                Verified Node
                            </p>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center border border-white/10">
                            <User size={20} className="text-black" />
                        </div>
                    </div>

                    {/* Trigger Global del Menú (Mobile Only o Drawer) */}
                    <button
                        onClick={toggleMenu}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all border ${
                            isMenuOpen 
                            ? 'bg-orange-500 text-black border-orange-500 shadow-lg shadow-orange-500/20' 
                            : 'bg-white/5 text-white border-white/10 hover:border-orange-500/50'
                        }`}
                    >
                        {isMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={2} />}
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;
