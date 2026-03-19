import React from 'react';
import SidebarSection from './SidebarSection';
import SidebarLink from './SidebarLink';
import { useNavigation } from '../../contexts/NavigationContext';
import {
    Building2, Newspaper, Briefcase, GraduationCap,
    Coins, TrendingUp, Menu, BookOpen, Scale, Globe, Sprout,
    Telescope, ShieldCheck, Compass, Heart, Layers, Fingerprint, X, LayoutDashboard
} from 'lucide-react';

const Sidebar = ({ isDrawerOnly = false }) => {
    const { isMenuOpen, closeMenu } = useNavigation();

    // Bloqueo de scroll para mejorar la experiencia en celulares
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
            {/* Backdrop: Efecto de desenfoque cuando el menú está abierto */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[48] lg:hidden transition-opacity duration-300"
                    onClick={closeMenu}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                ${isMenuOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible ' + (!isDrawerOnly ? 'lg:translate-x-0 lg:opacity-100 lg:visible' : '')} 
                fixed right-0 w-[85%] max-w-sm z-[70] 
                ${isDrawerOnly ? 'top-24 h-[calc(100vh-96px)]' : 'top-20 h-[calc(100vh-80px)]'}
                ${!isDrawerOnly ? 'lg:relative lg:top-0 lg:h-auto lg:inset-auto lg:w-full lg:block lg:z-10' : ''} 
                space-y-8 bg-[#050505]/90 lg:bg-transparent backdrop-blur-2xl lg:backdrop-blur-none p-6 pt-10 
                border-l lg:border-l-0 border-white/10 lg:border-none shadow-2xl lg:shadow-none 
                transition-all duration-500 ease-in-out overflow-y-auto overflow-x-hidden
            `}>
                
                {/* Header del Menu en Móvil */}
                <div className="lg:hidden flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Ramux Menu</span>
                    </div>
                    <button onClick={closeMenu} className="p-2 bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-10">
                    {/* Sección 0: Navegación Rápida */}
                    <SidebarSection title="Navegación" icon={LayoutDashboard} colorClass="text-orange-500">
                        <SidebarLink
                            title="Dashboard"
                            subtitle="Panel de Control Central"
                            path="/dashboard"
                            icon={LayoutDashboard}
                            radiance="orange"
                        />
                    </SidebarSection>

                    {/* Sección 1: Founder's Vision */}
                    <SidebarSection title="Founder's Vision" icon={Telescope} colorClass="text-slate-400">
                        <SidebarLink
                            title="Opinión y coyuntura"
                            subtitle="La realidad entre líneas"
                            path="/opinion"
                            icon={Newspaper}
                            radiance="silver"
                        />
                    </SidebarSection>

                    {/* Sección 2: Legal & Compliance */}
                    <SidebarSection title="Legal & Compliance" icon={ShieldCheck} colorClass="text-amber-500">
                        <SidebarLink
                            title="Radar Laboral"
                            subtitle="Análisis de Leyes"
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
                            subtitle="Estrategia e Inversión"
                            path="/expansion-global"
                            icon={Globe}
                            badge="NEW"
                            radiance="green"
                        />
                    </SidebarSection>

                    {/* Sección 4: Capital & Wealth Management */}
                    <SidebarSection title="Capital & Wealth" icon={Coins} colorClass="text-yellow-500">
                        <SidebarLink
                            title="Wealth Management"
                            subtitle="Gestión de Activos"
                            path="/capital-wealth"
                            icon={TrendingUp}
                            radiance="golden"
                        />
                    </SidebarSection>

                    {/* Sección 5: Ramux Academy */}
                    <SidebarSection title="Educación" icon={BookOpen} colorClass="text-violet-500">
                        <SidebarLink
                            title="Ramux Academy"
                            subtitle="Formación Financiera"
                            path="/academy"
                            icon={GraduationCap}
                            badge="ACCESO"
                            radiance="violet"
                        />
                    </SidebarSection>

                    {/* Sección EXTRA: Compromiso Ramux */}
                    <SidebarSection title="Impacto Social" icon={Heart} colorClass="text-cyan-400">
                        <SidebarLink
                            title="Compromiso Social"
                            subtitle="Desarrollo Civil"
                            path="/compromiso-social"
                            icon={Sprout}
                            radiance="cyan"
                        />
                    </SidebarSection>

                    {/* Sección 6: Servicios */}
                    <SidebarSection title="Servicios" icon={Layers} colorClass="text-rose-400">
                        <SidebarLink
                            title="Consultoría"
                            subtitle="Soluciones B2B"
                            path="/servicios"
                            icon={Briefcase}
                            radiance="peach"
                        />
                    </SidebarSection>

                    {/* Sección 7: Institucional */}
                    <SidebarSection title="Corporativo" icon={Fingerprint} colorClass="text-slate-400">
                        <SidebarLink
                            title="Quiénes Somos"
                            subtitle="Misión y Equipo"
                            path="/quienes-somos"
                            icon={Building2}
                            radiance="silver"
                        />
                    </SidebarSection>
                </div>

                {/* Footer del Sidebar */}
                <div className="mt-10 pt-6 border-t border-white/5 text-center">
                    <p className="text-[8px] font-bold text-white/10 uppercase tracking-[0.4em]">
                        Ramux Capital Systems
                    </p>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
