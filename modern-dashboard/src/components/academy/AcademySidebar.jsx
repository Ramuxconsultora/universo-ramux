import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Activity, Scale, Users, User, ArrowLeft } from 'lucide-react';
import ramuxSello from '../../assets/ramux-sello.png';

const AcademySidebarLink = ({ title, icon: Icon, path, exact }) => (
    <NavLink
        to={path}
        end={exact}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.1)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-white/5'
            }`
        }
    >
        <Icon size={20} />
        <span className="font-semibold tracking-wide">{title}</span>
    </NavLink>
);

const AcademySidebar = () => {
    return (
        <div className="bg-[#0b1121]/80 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-2xl h-full flex flex-col">
            {/* Logo Area */}
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
                <img src={ramuxSello} alt="RAMUX Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                <div>
                    <h2 className="text-xl font-bold text-white tracking-widest font-orbitron">RAMUX</h2>
                    <p className="text-xs text-sky-400 font-mono">ACADEMY</p>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2 flex-grow">
                <AcademySidebarLink title="Mis Cursos" icon={BookOpen} path="/academy" exact />
                <AcademySidebarLink title="Simulador de Mercado" icon={Activity} path="/academy/simulator" />
                <AcademySidebarLink title="Biblioteca Legislativa" icon={Scale} path="/academy/library" />
                <AcademySidebarLink title="Comunidad" icon={Users} path="/academy/community" />
                <AcademySidebarLink title="Perfil" icon={User} path="/academy/profile" />
            </div>

            {/* Back to main Dashboard */}
            <div className="mt-8 pt-6 border-t border-white/5">
                <NavLink to="/dashboard" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-800/50 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-xl transition-all border border-slate-700 hover:border-sky-500/30 text-sm font-bold group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Volver al Dashboard
                </NavLink>
            </div>
        </div>
    );
};

export default AcademySidebar;
