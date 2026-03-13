import React, { useState } from 'react';
import SidebarSection from './SidebarSection';
import SidebarLink from './SidebarLink';
import GlassPanel from '../ui/GlassPanel';
import MarketSimulator from '../widgets/MarketSimulator';
import {
    Building2, Newspaper, Briefcase, GraduationCap,
    BarChart2, Zap, MessageSquare, Trophy, Instagram, Linkedin, Youtube,
    ChevronDown, ChevronUp, Menu, BookOpen, Scale, Globe
} from 'lucide-react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-4 lg:space-y-8">
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-full flex items-center justify-between p-4 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
                <div className="flex items-center gap-3 font-bold">
                    <Menu size={20} className="text-sky-400" />
                    Explorar Menú
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {/* Sidebar Content (hidden on mobile when closed) */}
            <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-8 bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-2xl transition-all duration-300`}>

                {/* Social Media Links Card */}
                <div className="flex justify-center gap-4 pb-2 border-b border-white/5">
                    <a href="https://www.instagram.com/ramuxconsultora/?hl=es-la" target="_blank" rel="noreferrer" className="p-2 bg-slate-800/50 text-slate-400 hover:text-pink-500 hover:bg-slate-800 rounded-lg transition-all hover:scale-110 border border-transparent hover:border-pink-500/30">
                        <Instagram size={20} />
                    </a>
                    <a href="https://www.linkedin.com/company/ramuxconsultora" target="_blank" rel="noreferrer" className="p-2 bg-slate-800/50 text-slate-400 hover:text-blue-500 hover:bg-slate-800 rounded-lg transition-all hover:scale-110 border border-transparent hover:border-blue-500/30">
                        <Linkedin size={20} />
                    </a>
                    <a href="#" target="_blank" rel="noreferrer" className="p-2 bg-slate-800/50 text-slate-400 hover:text-red-500 hover:bg-slate-800 rounded-lg transition-all hover:scale-110 border border-transparent hover:border-red-500/30">
                        <Youtube size={20} />
                    </a>
                    <a href="#" target="_blank" rel="noreferrer" className="p-2 bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all hover:scale-110 border border-transparent hover:border-white/30">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                    </a>
                </div>

                {/* Legal & Compliance Section (Radar Laboral) */}
                <SidebarSection title="Legal & Compliance" icon={Scale} colorClass="text-amber-400">
                    <SidebarLink
                        title="Radar Laboral"
                        subtitle="Nueva Ley Laboral"
                        path="/radar-laboral"
                        icon={Scale}
                        badge="HOT"
                        badgeColor="amber"
                        colorClass="amber"
                    />
                    <SidebarLink
                        title="Expansión Global"
                        subtitle="Estrategia Internacional"
                        path="/expansion-global"
                        icon={Globe}
                        badge="HOT"
                        badgeColor="emerald"
                        colorClass="emerald"
                    />
                </SidebarSection>

                {/* Institucional Section */}
                <SidebarSection title="Institucional" icon={Building2} colorClass="text-slate-200">
                    <SidebarLink
                        title="Quiénes Somos"
                        subtitle="Nuestra visión y equipo."
                        path="/quienes-somos"
                        icon={Building2}
                        colorClass="sky"
                    />
                    <SidebarLink
                        title="Noticias"
                        subtitle="Feed de novedades financieras."
                        path="/noticias"
                        icon={Newspaper}
                        colorClass="sky"
                    />
                </SidebarSection>

                {/* Servicios Section */}
                <SidebarSection title="Servicios" icon={Briefcase} colorClass="text-slate-200">
                    <SidebarLink
                        title="Catálogo"
                        subtitle="Consultoría y Soluciones."
                        path="/servicios"
                        icon={Briefcase}
                        colorClass="emerald"
                    />
                </SidebarSection>

                {/* Education Section */}
                <SidebarSection title="Educación" icon={BookOpen} colorClass="text-sky-400">
                    <SidebarLink
                        title="Ramux Academy"
                        subtitle="Educación Financiera & IA."
                        path="/academy"
                        icon={GraduationCap}
                        badge="NUEVO"
                        badgeColor="sky"
                        colorClass="sky"
                    />
                </SidebarSection>

                {/* Markets & Finance Section */}
                <SidebarSection title="Mercados" icon={BarChart2} colorClass="text-emerald-400">
                    <div className="transform scale-[0.85] w-[117%] -ml-[8.5%] origin-top">
                        <MarketSimulator />
                    </div>
                </SidebarSection>



                {/* AI Research Hub */}
                <SidebarSection title="IA Research" icon={Zap} colorClass="text-violet-500">
                    <SidebarLink
                        title="LLMs & Generative AI"
                        subtitle="Últimos papers y modelos."
                        path="/dashboard" // Placeholder path for now
                        icon={Zap}
                        badge="LATEST"
                        badgeColor="violet"
                        colorClass="violet"
                    />
                    {/* We will add Consulta IA widget link/trigger here later if needed, 
                    or the widget will be on the main dashboard */}
                </SidebarSection>

                {/* XP Summary (Stateful/Dynamic later) */}
                <GlassPanel className="bg-gradient-to-br from-slate-900 to-slate-800">
                    <div className="flex items-center gap-3 mb-3">
                        <Trophy className="text-amber-400" size={24} />
                        <div>
                            <p className="text-xs text-slate-400 uppercase">Tu Progreso</p>
                            <p className="text-lg font-bold text-white">Nivel 1</p>
                        </div>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 mb-2 border border-slate-800">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full w-[15%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]"></div>
                    </div>
                </GlassPanel>
            </div>
        </div>
    );
};

export default Sidebar;
