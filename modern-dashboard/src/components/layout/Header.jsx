import React, { useState } from 'react';
import { User, Bell, Languages, LogIn } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const { user } = useAuth();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 h-20 flex items-center bg-slate-950/95 border-b border-white/10 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">

                {/* 1. User Profile Link (Left) */}
                {user ? (
                    <a href="/profile" className="w-1/3 flex items-center gap-4 group cursor-pointer no-underline">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-sky-400 transition-colors uppercase font-bold text-sky-400">
                            {user.email ? user.email.charAt(0) : <User size={20} />}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">{t('Bienvenido/a a Universo Ramux')}</p>
                        </div>
                    </a>
                ) : (
                    <a href="/login" className="w-1/3 flex items-center gap-3 group cursor-pointer no-underline">
                        <div className="flex items-center gap-2 bg-sky-600/20 hover:bg-sky-600 text-sky-400 hover:text-white px-4 py-2 border border-sky-500/30 rounded-lg transition-all font-bold text-sm">
                            <LogIn size={16} /> Ingresar / Registrarse
                        </div>
                    </a>
                )}

                {/* 2. Logo/Title (Center) */}
                <div className="w-1/3 flex justify-center items-end pb-1">
                    <span className="font-black text-2xl text-white leading-none tracking-tight">RAMUX</span>
                    <span className="w-2 h-2 bg-orange-500 rounded-full ml-1 mb-1 animate-pulse"></span>
                </div>

                {/* 3. Utilities (Right) */}
                <div className="w-1/3 flex justify-end items-center gap-6 relative">

                    {/* Language Selector */}
                    <div className="flex bg-slate-800/80 rounded-lg p-1 border border-slate-700">
                        <button
                            onClick={() => changeLanguage('es')}
                            className={`px-2 py-1 text-xs font-bold rounded transition-colors ${i18n.language.startsWith('es') ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                        >
                            ES
                        </button>
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`px-2 py-1 text-xs font-bold rounded transition-colors ${i18n.language.startsWith('en') ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                        >
                            EN
                        </button>
                    </div>

                    <button
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className="text-slate-400 hover:text-white transition-colors relative z-50 flex items-center"
                    >
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </button>

                    {/* Dropdown */}
                    {notificationsOpen && (
                        <div className="absolute top-12 right-0 w-80 z-40">
                            <GlassPanel className="p-0 overflow-hidden bg-slate-900/95">
                                <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-900/50">
                                    <span className="font-bold text-white text-sm">Notificaciones</span>
                                    <span className="text-[10px] text-sky-400 cursor-pointer hover:underline">Marcar leídas</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto p-2 space-y-2">
                                    <div className="p-3 hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors">
                                        <p className="text-xs text-slate-300"><span className="font-bold text-white">Ana_Trader</span> comentó en tu publicación.</p>
                                        <span className="text-[10px] text-slate-500 mt-1 block">Hace 5 min</span>
                                    </div>
                                </div>
                            </GlassPanel>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Header;
