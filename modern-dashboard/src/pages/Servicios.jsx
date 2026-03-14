import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import { 
    Briefcase, 
    ArrowLeft, 
    Home, 
    Users, 
    Code, 
    Bot, 
    GraduationCap, 
    Globe, 
    DollarSign,
    Zap,
    Scale,
    ExternalLink
} from 'lucide-react';

const ServiceWidget = ({ title, description, icon: Icon, radiance, ctaPath, isActive }) => {
    const navigate = useNavigate();
    
    return (
        <NeumorphicPanel 
            radiance={radiance}
            className="p-8 h-full group hover:scale-[1.02] transition-all duration-500 bg-gradient-to-br from-[#1c2230] to-[#181d27]"
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-[#12161f] shadow-inner border border-white/5 transition-transform duration-500 group-hover:scale-110`}>
                        <Icon className="text-slate-400 group-hover:text-white transition-colors duration-500" size={28} />
                    </div>
                    {isActive ? (
                        <div className="px-3 py-1 bg-sky-500/10 rounded-full border border-sky-500/20">
                            <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Activo</span>
                        </div>
                    ) : (
                        <div className="px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Próximamente</span>
                        </div>
                    )}
                </div>
                
                <h3 className="text-xl font-black text-white mb-4 tracking-tight leading-tight group-hover:text-white transition-colors duration-500 uppercase">
                    {title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors duration-500 mb-8 flex-grow">
                    {description}
                </p>

                <div className="mt-auto pt-6 flex flex-col gap-4">
                    {ctaPath && (
                        <button 
                            onClick={() => navigate(ctaPath)}
                            className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 hover:border-white/20 transition-all font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 group/btn"
                        >
                            Acceder ahora
                            <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    )}
                    {!isActive && (
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest italic opacity-40">
                            <span>Lanzamiento en breve</span>
                            <Zap size={12} />
                        </div>
                    )}
                </div>
            </div>
        </NeumorphicPanel>
    );
};

const Servicios = () => {
    const navigate = useNavigate();

    const services = [
        {
            title: "Legal & Compliance: Consultoría estratégica en Recursos Humanos",
            description: "Optimizamos el capital humano de tu organización. Desde la gestión de talento hasta el asesoramiento en relaciones laborales, aplicamos una visión profesional y actualizada para transformar la administración de personal en un motor de crecimiento.",
            icon: Scale,
            radiance: "amber",
            ctaPath: "/radar-laboral",
            isActive: true
        },
        {
            title: "Global Trade: Comercio y Gestión Internacional",
            description: "Brindamos soporte estratégico para la expansión de negocios en mercados externos. Con foco en la gestión de negocios internacionales, ayudamos a tu empresa a navegar la complejidad del comercio global, identificando oportunidades y optimizando procesos de exportación e importación.",
            icon: Globe,
            radiance: "green",
            ctaPath: "/expansion-global",
            isActive: true
        },
        {
            title: "Ramux Academy: Capacitación y Formación",
            description: "Especializados en la preparación para el examen de Idoneidad de la CNV y formación técnica en gestión. Ofrecemos contenido educativo de alto nivel diseñado para que profesionales y entusiastas dominen el mercado financiero y las herramientas de gestión modernas.",
            icon: GraduationCap,
            radiance: "violet",
            ctaPath: "/academy",
            isActive: true
        },
        {
            title: "Automatización e Integración de IA",
            description: "Modernizamos tus flujos de trabajo mediante la implementación de Inteligencia Artificial. Desarrollamos soluciones personalizadas, como sistemas de liquidación de haberes asistidos por IA, para reducir errores, ahorrar tiempo y potenciar la productividad de tu equipo.",
            icon: Bot,
            radiance: "blue",
            isActive: true
        },
        {
            title: "Desarrollo y Creación de Sitios Web",
            description: "Llevamos tu marca al mundo digital con diseños modernos, rápidos y funcionales. Todo el ecosistema de Universo Ramux que éstas navegando es un desarrollo propio, lo que garantiza que aplicamos en nuestros clientes la misma tecnología y dedicación que usamos para nuestra propia plataforma.",
            icon: Code,
            radiance: "cyan",
            isActive: true
        },
        {
            title: "Capital & Wealth: Finanzas e inversiones",
            description: "Herramientas y asesoramiento especializado en el mercado de capitales. Combinamos el análisis financiero con interfaces tecnológicas intuitivas para que la toma de decisiones de inversión sea estratégica, informada y eficiente.",
            icon: DollarSign,
            radiance: "golden",
            isActive: false
        }
    ];

    // Force scroll to top on mount
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-12 animate-fade-in py-6">
                
                {/* Navigation Bar */}
                <div className="flex justify-between items-center bg-[#12161f]/40 p-4 rounded-3xl border border-white/5 backdrop-blur-sm shadow-xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-slate-800/50 hover:bg-[#F76B1C] text-slate-300 hover:text-white rounded-xl transition-all border border-slate-700 hover:border-[#F76B1C] text-xs font-black uppercase tracking-widest group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Volver
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center justify-center p-3 bg-sky-900/30 hover:bg-sky-500 text-sky-400 hover:text-white rounded-xl transition-all border border-sky-500/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] group"
                    >
                        <Home size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Header Section - CENTERED */}
                <div className="relative group/header flex flex-col items-center text-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none group-hover/header:bg-sky-500/10 transition-colors duration-1000" />
                    
                    <div className="flex flex-col items-center space-y-6 relative z-10 w-full">
                        <div className="flex items-center gap-3 px-5 py-2 bg-sky-500/10 rounded-full border border-sky-500/20 w-fit backdrop-blur-md">
                            <Briefcase size={16} className="text-sky-400" />
                            <span className="text-[11px] font-black text-sky-400 uppercase tracking-[0.3em]">Portafolio de Excelencia</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-7xl font-black text-white leading-[1] tracking-tighter uppercase max-w-5xl">
                            Servicios de <br />
                            <span className="text-[#F76B1C]">Universo Ramux</span>
                        </h1>
                        
                        <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-[#F76B1C] to-transparent rounded-full" />
                        
                        <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed font-medium">
                            Soluciones integrales diseñadas para la era digital, combinando visión estratégica con tecnología de vanguardia para potenciar el crecimiento sostenible.
                        </p>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceWidget key={index} {...service} />
                    ))}
                </div>

                {/* Diferencial Section */}
                <NeumorphicPanel 
                    radiance="ramux"
                    className="p-10 md:p-16 mt-20 relative overflow-hidden group/diff border-t border-sky-500/10"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#F76B1C]/5 rounded-full blur-[120px] pointer-events-none group-hover/diff:bg-[#F76B1C]/10 transition-colors duration-1000" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                        <div className="w-20 h-20 bg-[#12161f] rounded-[2.5rem] shadow-inner border border-[#F76B1C]/20 flex items-center justify-center text-4xl group-hover/diff:scale-110 group-hover/diff:rotate-12 transition-all duration-700">
                            🚀
                        </div>
                        
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                                El diferencial de <span className="text-[#F76B1C]">Ramux</span>
                            </h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#F76B1C] to-transparent mx-auto rounded-full" />
                        </div>

                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light italic">
                            "No solo ofrecemos servicios; somos los desarrolladores de nuestra propia infraestructura. 
                            Nuestra plataforma es el caso de éxito número uno de lo que podemos hacer por tu negocio: 
                            <span className="text-white font-bold not-italic"> tecnología propia, integración de IA y visión global aplicada.</span>"
                        </p>

                        <a 
                            href="https://wa.me/message/WATOKPKLCBMPK1"
                            target="_blank"
                            rel="noreferrer"
                            className="px-10 py-5 bg-[#F76B1C] hover:bg-[#ff8a4d] text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_10px_40px_rgba(247,107,28,0.3)] hover:shadow-[0_15px_50px_rgba(247,107,28,0.5)] active:scale-95 group/btn flex items-center gap-4 no-underline"
                        >
                            <span>Impulsa tu proyecto</span>
                            <Zap size={20} className="group-hover/btn:animate-bounce" />
                        </a>
                    </div>
                </NeumorphicPanel>
            </div>
        </Layout>
    );
};

export default Servicios;
