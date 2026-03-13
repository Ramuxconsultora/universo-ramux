import React, { useState } from 'react';
import SidebarSection from './SidebarSection';
import SidebarLink from './SidebarLink';
import {
    Building2, Newspaper, Briefcase, GraduationCap,
    Coins, TrendingUp, Instagram, Linkedin, Youtube,
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

                {/* Sección 1: Founder's Vision */}
                <SidebarSection title="Founder's Vision" icon={Newspaper} colorClass="text-slate-200">
                    <SidebarLink
                        title="Opinión y coyuntura"
                        subtitle="La realidad entre líneas."
                        path="/noticias"
                        icon={Newspaper}
                        colorClass="sky"
                    />
                </SidebarSection>

                {/* Sección 2: Legal & Compliance */}
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
                </SidebarSection>

                {/* Sección 3: Global Trade */}
                <SidebarSection title="Global Trade" icon={Globe} colorClass="text-emerald-400">
                    <SidebarLink
                        title="Expansión Global"
                        subtitle="Estrategia Internacional"
                        path="/expansion-global"
                        icon={Globe}
                        badge="NEW"
                        badgeColor="emerald"
                        colorClass="emerald"
                    />
                </SidebarSection>

                {/* Sección 4: Capital & Wealth Management */}
                <SidebarSection title="Capital & Wealth" icon={Coins} colorClass="text-sky-400">
                    <SidebarLink
                        title="Asesoramiento Financiero"
                        subtitle="Gestión patrimonial experta."
                        path="/dashboard"
                        icon={TrendingUp}
                        badge="PROXIMAMENTE"
                        badgeColor="sky"
                        colorClass="sky"
                    />
                </SidebarSection>

                {/* Sección 5: Ramux Academy */}
                <SidebarSection title="Educación" icon={BookOpen} colorClass="text-sky-400">
                    <SidebarLink
                        title="Ramux Academy"
                        subtitle="Acceso a formación y cursos."
                        path="/academy"
                        icon={GraduationCap}
                        badge="NUEVO"
                        badgeColor="sky"
                        colorClass="sky"
                    />
                </SidebarSection>

                {/* Sección 6: Servicios Profesionales */}
                <SidebarSection title="Servicios" icon={Briefcase} colorClass="text-slate-200">
                    <SidebarLink
                        title="Catálogo"
                        subtitle="Consultoría y Soluciones."
                        path="/servicios"
                        icon={Briefcase}
                        colorClass="emerald"
                    />
                </SidebarSection>

                {/* Sección 7: Institucional */}
                <SidebarSection title="Institucional" icon={Building2} colorClass="text-slate-200">
                    <SidebarLink
                        title="Quiénes Somos"
                        subtitle="Nuestra visión y equipo."
                        path="/quienes-somos"
                        icon={Building2}
                        colorClass="sky"
                    />
                </SidebarSection>
            </div>
        </div>
    );
};

export default Sidebar;
