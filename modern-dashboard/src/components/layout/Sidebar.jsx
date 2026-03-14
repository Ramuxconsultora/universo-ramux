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
            <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-6 bg-[#1a1f2b] p-6 rounded-[32px] border border-white/5 shadow-2xl transition-all duration-300 ring-1 ring-black/20`}>

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
                        badge="COMING SOON"
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
