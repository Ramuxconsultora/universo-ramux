import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import GlassPanel from '../components/ui/GlassPanel';
import { Briefcase, ArrowRight, MessageCircle, Bot, GraduationCap, LineChart, ArrowLeft, Home } from 'lucide-react';

// Stateless Component for displaying a single service card
const ServiceCard = ({ id, title, paragraph, bullets, category, icon, ctaText, isAcademyLink, customCtaIcon }) => {

    // Default CTA (WhatsApp) vs Academy CTA (Internal Route)
    const CtaIcon = customCtaIcon || MessageCircle;

    // Shared button classes
    const buttonClasses = isAcademyLink
        ? "w-full py-4 px-6 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all duration-300 flex justify-center items-center gap-3 mt-auto shadow-[0_0_20px_rgba(14,165,233,0.2)] hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] border border-sky-400/50 hover:scale-[1.02]"
        : "w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all duration-300 flex justify-center items-center gap-3 mt-auto shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400/50 hover:scale-[1.02]";

    return (
        <GlassPanel className="flex flex-col h-full group hover:border-sky-500/30 transition-all duration-300 p-8" hoverEffect={true}>
            <div className="mb-6 text-sky-400 bg-sky-500/10 w-16 h-16 rounded-xl flex items-center justify-center">
                {icon}
            </div>
            <div className="mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500">{category}</span>
                <h3 className="text-2xl font-bold text-white mt-2 leading-tight">{title}</h3>
            </div>
            <p className="text-base text-slate-300 mb-6 leading-relaxed">{paragraph}</p>
            <ul className="text-sm text-slate-400 mb-10 flex-grow space-y-3">
                {bullets.map((bullet, index) => (
                    <li key={index} className="flex gap-3 items-start">
                        <span className="text-sky-400 mt-1">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                    </li>
                ))}
            </ul>

            {isAcademyLink ? (
                <Link to="/academy" className={buttonClasses}>
                    <CtaIcon size={22} className="text-white" />
                    <span className="tracking-wide">{ctaText || "Ir a Ramux Academy"}</span>
                </Link>
            ) : (
                <a
                    href="https://wa.me/message/WATOKPKLCBMPK1"
                    target="_blank"
                    rel="noreferrer"
                    className={buttonClasses}
                >
                    <CtaIcon size={22} className="text-white" />
                    <span className="tracking-wide">{ctaText || "Agendar Sesión de Trabajo"}</span>
                </a>
            )}
        </GlassPanel>
    );
};

const Servicios = () => {
    const navigate = useNavigate();

    const servicesData = [
        {
            id: 1,
            title: "Automatización e Innovación con IA",
            category: "Transformación Digital",
            paragraph: "Multiplicamos la eficiencia de su organización integrando soluciones tecnológicas de vanguardia. Convertimos datos complejos en decisiones estratégicas contundentes, eliminando cuellos de botella y liberando a su equipo para tareas de alto valor.",
            bullets: [
                "Implementación de Inteligencia Artificial aplicada a la comunicación y gestión corporativa.",
                "Automatización inteligente de flujos de trabajo operativos para reducir costos y tiempos.",
                "Análisis profundo de datos (Data Analytics) para impulsar estrategias corporativas de precisión quirúrgica."
            ],
            icon: <Bot size={32} />,
            ctaText: "Integrar IA en mi Negocio"
        },
        {
            id: 2,
            title: "Capacitaciones de Alto Rendimiento",
            category: "Educación y Entrenamiento",
            paragraph: "Transformamos el conocimiento en capacidad operativa mediante programas de inmersión técnica donde la teoría se aplica de forma inmediata. Diseñamos experiencias de aprendizaje orientadas a resultados medibles, integrando la vanguardia tecnológica con el rigor normativo.",
            bullets: [
                "Entornos de Aprendizaje Dinámicos: Formación impulsada por nuestro simulador de mercado integrado, permitiendo la práctica en tiempo real de análisis técnico y gestión de carteras.",
                "Especialización en IA y Automatización: Programas de introducción y utilización avanzada de Inteligencia Artificial aplicados a la productividad organizacional y la generación de contenido inteligente.",
                "Experticia en Mercados y Legislación: Módulos de preparación intensiva diseñados para alcanzar el nivel de Idoneidad ante la Comisión Nacional de Valores (CNV), con un enfoque profundo en el marco legal vigente.",
                "Desarrollo de Liderazgo Organizacional: Consultoría y formación a medida para fortalecer el liderazgo interno, alineando el crecimiento humano con la eficiencia de los procesos.",
                "Finanzas Integrales: Capacitación técnica que abarca desde las finanzas personales hasta el análisis técnico avanzado, adaptada a las necesidades específicas de cada perfil."
            ],
            icon: <GraduationCap size={32} />,
            ctaText: "Ver Planes en Academy",
            isAcademyLink: true,
            customCtaIcon: GraduationCap
        },
        {
            id: 3,
            title: "Asesoramiento Financiero y Estratégico",
            category: "Wealth Management",
            paragraph: "Diseñamos un mapa de ruta claro para el crecimiento sostenido de su patrimonio. Aportamos la claridad y experiencia necesarias para navegar escenarios económicos complejos con total seguridad y visión de futuro.",
            bullets: [
                "Análisis avanzado y diseño de estrategias de inversión en mercados de capitales locales e internacionales.",
                "Diagnóstico exhaustivo de riesgo financiero para proteger sus activos en entornos volátiles.",
                "Acompañamiento personalizado enfocado en maximizar la rentabilidad para individuos, empresas y entidades del sector público."
            ],
            icon: <LineChart size={32} />,
            ctaText: "Potenciar mis Finanzas"
        }
    ];

    return (
        <Layout>
            <div className="space-y-8 animate-fade-in relative">

                {/* Navigation Row */}
                <div className="flex justify-between items-center mb-6 pt-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg transition-all border border-slate-700 hover:border-sky-500/50 text-sm font-bold group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Volver
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center justify-center p-2.5 bg-sky-900/30 hover:bg-sky-800/50 text-sky-400 hover:text-sky-300 rounded-lg transition-all border border-sky-500/30 hover:border-sky-400/60 group"
                        title="Ir al Dashboard"
                    >
                        <Home size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                <div className="flex flex-col mb-12 pb-6 border-b border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <Briefcase className="text-sky-400" size={40} />
                        <h2 className="text-4xl font-bold text-white tracking-tight">Nuestros Servicios</h2>
                    </div>
                    <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
                        En Ramux combinamos comunicación estratégica, gestión organizacional avanzada y desarrollo financiero.
                        Impulsamos el verdadero potencial de su organización a través de tecnologías de nueva generación y educación inmersiva,
                        garantizando resultados que impactan directamente en su rentabilidad.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesData.map(service => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Servicios;
