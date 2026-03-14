import { Link } from 'react-router-dom';
import { User, LogIn, Instagram, Linkedin, Youtube } from 'lucide-react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
    const { t } = useTranslation();
    const { user } = useAuth();

    return (
        <header className="fixed top-0 left-0 w-full z-50 h-20 flex items-center glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">

                {/* 1. User Profile / Access (Left) */}
                <div className="flex-1 flex justify-start items-center">
                    {user ? (
                        <a href="/profile" className="flex items-center gap-4 group cursor-pointer no-underline">
                            <div className="w-10 h-10 rounded-xl bg-[#1a1f2b] border border-white/5 flex items-center justify-center group-hover:border-[#F76B1C] transition-colors uppercase font-bold text-[#F76B1C] shadow-sm">
                                {user.email ? user.email.charAt(0) : <User size={20} />}
                            </div>
                            <div className="hidden md:block">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('STATUS_ONLINE')}</p>
                                <p className="text-xs font-bold text-white group-hover:text-[#F76B1C] transition-colors">{user.email?.split('@')[0]}</p>
                            </div>
                        </a>
                    ) : (
                        <a href="/login" className="flex items-center gap-3 group cursor-pointer no-underline w-fit">
                            <NeumorphicPanel className="px-6 py-2.5 group-hover:text-[#F76B1C] transition-all">
                                <span className="flex items-center gap-2 font-black text-[11px] uppercase tracking-widest">
                                    <LogIn size={14} /> Log in
                                </span>
                            </NeumorphicPanel>
                        </a>
                    )}
                </div>

                {/* 2. Logo/Title (Center) */}
                <Link to="/dashboard" className="flex-none flex justify-center items-center no-underline group">
                    <div className="flex items-baseline">
                        <span className="font-black text-[34px] text-white leading-none tracking-tight group-hover:text-[#F76B1C] transition-colors">RAMUX</span>
                        <div className="w-2.5 h-2.5 bg-[#F76B1C] rounded-full animate-pulse shadow-[0_0_12px_#F76B1C] ml-2 translate-y-[2px]" />
                    </div>
                </Link>

                {/* 3. Social Media Links (Right) */}
                <div className="flex-1 flex justify-end items-center">
                    <div className="flex items-center gap-2 bg-[#12161f] rounded-2xl p-1.5 border border-black/20 shadow-inner">
                        <a href="https://www.instagram.com/ramuxconsultora/?hl=es-la" target="_blank" rel="noreferrer" className="p-2.5 text-slate-500 hover:text-[#F76B1C] transition-all hover:scale-110">
                            <Instagram size={18} />
                        </a>
                        <a href="https://www.linkedin.com/company/ramuxconsultora" target="_blank" rel="noreferrer" className="p-2.5 text-slate-500 hover:text-[#F76B1C] transition-all hover:scale-110">
                            <Linkedin size={18} />
                        </a>
                        <a href="https://www.tiktok.com/@ramuxconsultora" target="_blank" rel="noreferrer" className="p-2.5 text-slate-500 hover:text-[#F76B1C] transition-all hover:scale-110">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tiktok">
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@ramuxconsultora" target="_blank" rel="noreferrer" className="p-2.5 text-slate-500 hover:text-[#F76B1C] transition-all hover:scale-110">
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
