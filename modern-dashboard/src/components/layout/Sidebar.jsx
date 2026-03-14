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
        <div className="space-y-4 lg:space-y-8 lg:sticky lg:top-28">
            {/* Mobile Toggle Button (Neumorphic) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-full flex items-center justify-between p-4 bg-[#1a1f2b] rounded-2xl border border-white/5 shadow-lg text-slate-300 hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
            >
                <div className="flex items-center gap-3">
                    <Menu size={18} className="text-sky-400" />
                    Menu_Principal
                </div>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {/* Sidebar Content (hidden on mobile when closed) - Soft UI Container */}
            <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-6 bg-[#0a0e1a]/80 backdrop-blur-md p-6 rounded-[32px] border border-white/5 shadow-soft-dark transition-all duration-300 ring-1 ring-white/5`}>

                {/* Sección 1: Founder's Vision */}
                <SidebarSection title="Founder's Vision" icon={Newspaper} colorClass="text-slate-400">
                    <SidebarLink
                        title="Opinión y coyuntura"
                        subtitle="La realidad entre líneas."
                        path="/noticias"
                        icon={Newspaper}
                        radiance="silver"
                    />
                </SidebarSection>

                {/* Sección 2: Legal & Compliance */}
                <SidebarSection title="Legal & Compliance" icon={Scale} colorClass="text-amber-500">
                    <SidebarLink
                        title="Radar Laboral"
                        subtitle="Nueva Ley Laboral"
                        path="/radar-laboral"
                        icon={Scale}
                        badge="HOT"
                        radiance="amber"
                    />
                </SidebarSection>

                {/* Sección 3: Global Trade */}
                <SidebarSection title="Global Trade" icon={Globe} colorClass="text-emerald-500">
                    <SidebarLink
                        title="Expansión Global"
                        subtitle="Estrategia Internacional"
                        path="/expansion-global"
                        icon={Globe}
                        badge="NEW"
                        radiance="green"
                    />
                </SidebarSection>

                {/* Sección 4: Capital & Wealth Management */}
                <SidebarSection title="Capital & Wealth" icon={Coins} colorClass="text-yellow-500">
                    <SidebarLink
                        title="Asesoramiento Financiero"
                        subtitle="Gestión patrimonial experta."
                        path="/dashboard"
                        icon={TrendingUp}
                        badge="COMING SOON"
                        radiance="golden"
                    />
                </SidebarSection>

                {/* Sección 5: Ramux Academy */}
                <SidebarSection title="Educación" icon={BookOpen} colorClass="text-violet-500">
                    <SidebarLink
                        title="Ramux Academy"
                        subtitle="Acceso a formación y cursos."
                        path="/academy"
                        icon={GraduationCap}
                        badge="NUEVO"
                        radiance="violet"
                    />
                </SidebarSection>

                {/* Sección 6: Servicios Profesionales */}
                <SidebarSection title="Servicios" icon={Briefcase} colorClass="text-sky-500">
                    <SidebarLink
                        title="Catálogo"
                        subtitle="Consultoría y Soluciones."
                        path="/servicios"
                        icon={Briefcase}
                        radiance="blue"
                    />
                </SidebarSection>

                {/* Sección 7: Institucional */}
                <SidebarSection title="Institucional" icon={Building2} colorClass="text-slate-400">
                    <SidebarLink
                        title="Quiénes Somos"
                        subtitle="Nuestra visión y equipo."
                        path="/quienes-somos"
                        icon={Building2}
                        radiance="silver"
                    />
                </SidebarSection>
            </div>
        </div>
    );
};

export default Sidebar;
