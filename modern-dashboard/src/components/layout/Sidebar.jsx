import React, { useState } from 'react';
import SidebarSection from './SidebarSection';
import SidebarLink from './SidebarLink';
import {
    Building2, Newspaper, Briefcase, GraduationCap,
    Coins, TrendingUp, Instagram, Linkedin, Youtube,
    ChevronDown, ChevronUp, Menu, BookOpen, Scale, Globe, Sprout,
    Telescope, ShieldCheck, Compass, Heart, Layers, Fingerprint
} from 'lucide-react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Body scroll lock effect
    React.useEffect(() => {
        const handleScrollLock = () => {
            if (isOpen && window.innerWidth < 1024) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        handleScrollLock();
        window.addEventListener('resize', handleScrollLock);
        
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('resize', handleScrollLock);
        };
    }, [isOpen]);

    return (
        <div className="space-y-4 lg:space-y-8 lg:sticky lg:top-28">
            {/* Mobile Toggle Button (Neumorphic) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-full flex items-center justify-between p-4 bg-[#1a1f2b] rounded-2xl border border-white/5 shadow-lg text-slate-300 hover:text-white transition-all font-bold text-xs uppercase tracking-widest relative z-50"
            >
                <div className="flex items-center gap-3">
                    <Menu size={18} className="text-sky-400" />
                    Menu_Principal
                </div>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {/* Backdrop Overlay for Mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content (hidden on mobile when closed) - Soft UI Container */}
            <div className={`
                ${isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible lg:translate-y-0 lg:opacity-100 lg:visible'} 
                fixed inset-x-4 top-24 bottom-6 z-40 lg:relative lg:inset-auto lg:top-0 lg:block space-y-6 bg-[#0a0e1a]/95 lg:bg-[#0a0e1a]/80 backdrop-blur-sm p-6 rounded-[32px] border border-white/10 lg:border-white/5 shadow-2xl lg:shadow-soft-dark transition-all duration-300 ring-1 ring-white/10 overflow-y-auto lg:overflow-visible
            `}>

                {/* Sección 1: Founder's Vision */}
                <SidebarSection title="Founder's Vision" icon={Telescope} colorClass="text-slate-400">
                    <SidebarLink
                        title="Opinión y coyuntura"
                        subtitle="La realidad entre líneas."
                        path="/opinion"
                        icon={Newspaper}
                        radiance="silver"
                    />
                </SidebarSection>

                {/* Sección 2: Legal & Compliance */}
                <SidebarSection title="Legal & Compliance" icon={ShieldCheck} colorClass="text-amber-500">
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
                <SidebarSection title="Global Trade" icon={Compass} colorClass="text-emerald-500">
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
                        path="/capital-wealth"
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

                {/* Sección EXTRA: Compromiso Ramux */}
                <SidebarSection title="Compromiso Ramux" icon={Heart} colorClass="text-cyan-400">
                    <SidebarLink
                        title="COnstuyendo el futuro civil"
                        subtitle="desarrollo social mas justo y trasnparente"
                        path="/compromiso-social"
                        icon={Sprout}
                        radiance="cyan"
                    />
                </SidebarSection>

                {/* Sección 6: Servicios Profesionales */}
                <SidebarSection title="Servicios" icon={Layers} colorClass="text-rose-400">
                    <SidebarLink
                        title="Catálogo"
                        subtitle="Consultoría y Soluciones."
                        path="/servicios"
                        icon={Briefcase}
                        radiance="peach"
                    />
                </SidebarSection>

                {/* Sección 7: Institucional */}
                <SidebarSection title="Institucional" icon={Fingerprint} colorClass="text-slate-400">
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
