import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogIn, Instagram, Linkedin, Youtube, Share2, ChevronDown } from 'lucide-react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [socialOpen, setSocialOpen] = useState(false);

    const socialLinks = [
        { icon: <Instagram size={18} />, href: "https://www.instagram.com/ramuxconsultora/?hl=es-la", label: "Instagram" },
        { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/company/ramuxconsultora", label: "LinkedIn" },
        { 
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
            ), 
            href: "https://www.tiktok.com/@ramuxconsultora", 
            label: "TikTok" 
        },
        { icon: <Youtube size={18} />, href: "https://www.youtube.com/@ramuxconsultora", label: "YouTube" }
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 h-20 flex items-center glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex justify-between items-center relative">

                {/* 1. User Profile / Access (Left) */}
                <div className="flex-1 flex justify-start items-center">
                    {user ? (
                        <a href="/profile" className="flex items-center gap-2 md:gap-4 group cursor-pointer no-underline">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#1a1f2b] border border-white/5 flex items-center justify-center group-hover:border-[#F76B1C] transition-colors overflow-hidden shadow-sm shrink-0">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="uppercase font-bold text-[#F76B1C]">{user.email?.charAt(0) || <User size={20} />}</span>
                                )}
                            </div>
                            <div className="hidden md:block">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('STATUS_ONLINE')}</p>
                                <p className="text-xs font-bold text-white group-hover:text-[#F76B1C] transition-colors">{user.email?.split('@')[0]}</p>
                            </div>
                        </a>
                    ) : (
                        <a href="/login" className="flex items-center gap-3 group cursor-pointer no-underline w-fit">
                            <NeumorphicPanel className="px-4 md:px-6 py-2 group-hover:text-[#F76B1C] transition-all">
                                <span className="flex items-center gap-2 font-black text-[10px] md:text-[11px] uppercase tracking-widest">
                                    <LogIn size={14} className="hidden sm:block" /> {t('LOGIN') || 'Log in'}
                                </span>
                            </NeumorphicPanel>
                        </a>
                    )}
                </div>

                {/* 2. Logo/Title (Center) - Adjusted for mobile */}
                <Link to="/dashboard" className="flex-none flex justify-center items-center no-underline group px-2">
                    <div className="flex items-baseline">
                        <span
                            className="font-black text-[24px] sm:text-[28px] md:text-[34px] text-white leading-none tracking-tight group-hover:text-[#F76B1C] transition-colors"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            RAMUX
                        </span>
                        <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-[#F76B1C] rounded-full animate-pulse shadow-[0_0_12px_#F76B1C] ml-1 md:ml-2 translate-y-[2px]" />
                    </div>
                </Link>

                {/* 3. Social Media Links (Right) */}
                <div className="flex-1 flex justify-end items-center">
                    {/* Desktop View */}
                    <div className="hidden lg:flex items-center gap-2 bg-[#12161f] rounded-2xl p-1.5 border border-black/20 shadow-inner">
                        {socialLinks.map((link, idx) => (
                            <a 
                                key={idx} 
                                href={link.href} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="p-2.5 text-slate-500 hover:text-[#F76B1C] transition-all hover:scale-110"
                                title={link.label}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>

                    {/* Mobile/Tablet View - Dropdown */}
                    <div className="lg:hidden relative">
                        <button 
                            onClick={() => setSocialOpen(!socialOpen)}
                            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1 ${
                                socialOpen ? 'bg-[#F76B1C] border-[#F76B1C] text-white' : 'bg-[#12161f] border-white/5 text-slate-400'
                            }`}
                        >
                            <Share2 size={18} />
                            <ChevronDown size={14} className={`transition-transform duration-300 ${socialOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {socialOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setSocialOpen(false)} />
                                <div className="absolute right-0 mt-3 w-48 bg-[#0f1218]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-2 flex flex-col gap-1">
                                        <div className="px-3 py-2 mb-1 border-b border-white/5">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{t('SOCIAL_FOLLOW') || 'Síguenos'}</p>
                                        </div>
                                        {socialLinks.map((link, idx) => (
                                            <a 
                                                key={idx} 
                                                href={link.href} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="flex items-center gap-3 p-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                                onClick={() => setSocialOpen(false)}
                                            >
                                                <span className="text-[#F76B1C]">{link.icon}</span>
                                                <span className="text-xs font-bold uppercase tracking-wider">{link.label}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
