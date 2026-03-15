import React from 'react';
import SidebarSection from './SidebarSection';
import SidebarLink from './SidebarLink';
import { useNavigation } from '../../contexts/NavigationContext';
import {
    Building2, Newspaper, Briefcase, GraduationCap,
    Coins, TrendingUp, ChevronUp, ChevronDown, Menu, BookOpen, Scale, Globe, Sprout,
    Telescope, ShieldCheck, Compass, Heart, Layers, Fingerprint, X
} from 'lucide-react';

const Sidebar = () => {
    const { isMenuOpen, closeMenu } = useNavigation();

    // Body scroll lock effect
    React.useEffect(() => {
        const handleScrollLock = () => {
            if (isMenuOpen && window.innerWidth < 1024) {
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
    }, [isMenuOpen]);

    return (
        <>
            {/* Backdrop Overlay for Mobile */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] lg:hidden transition-opacity duration-300"
                    onClick={closeMenu}
                />
            )}

            {/* Sidebar Content - Refined for Global Use */}
            <div className={`
                ${isMenuOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible lg:translate-x-0 lg:opacity-100 lg:visible'} 
                fixed inset-y-0 right-0 w-[85%] max-w-sm z-[100] lg:relative lg:inset-auto lg:w-[400px] lg:block space-y-6 bg-[#0a0e1a] lg:bg-[#0a0e1a]/40 backdrop-blur-xl p-8 pt-28 lg:pt-8 border-l lg:border-l-0 lg:border border-white/10 lg:border-white/5 shadow-2xl lg:shadow-none transition-all duration-500 ease-out overflow-y-auto overflow-x-hidden
            `}>
                
                {/* Mobile Close Button (Inside Sidebar) */}
                <div className="lg:hidden flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <Menu size={20} className="text-sky-400" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">Menu</span>
                    </div>
                    <button onClick={closeMenu} className="p-2 bg-white/5 rounded-xl text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-8">
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
                            title="Capital & Wealth"
                            subtitle="Estrategia y Gestión de Activos"
                            path="/capital-wealth"
                            icon={TrendingUp}
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
                            title="Construyendo el futuro civil"
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
        </>
    );
};

export default Sidebar;
