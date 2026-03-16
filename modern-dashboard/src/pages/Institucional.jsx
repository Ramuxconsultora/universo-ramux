import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import { 
    Building2, 
    Users, 
    ArrowLeft, 
    Home, 
    UserCircle,
    Telescope,
    ShieldCheck,
    Compass,
    Target,
    Zap
} from 'lucide-react';

const Institucional = () => {
    const navigate = useNavigate();

    // Force scroll to top on mount
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <div className="max-w-6xl mx-auto space-y-12 animate-fade-in py-6">

                {/* Hero Header Section */}
                <div className="relative group/header flex flex-col items-center text-center py-8">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-[40px] pointer-events-none group-hover/header:bg-sky-500/10 transition-colors duration-1000" />
                    
                    <div className="flex flex-col items-center space-y-6 relative z-10 w-full">
                        <div className="flex items-center gap-3 px-5 py-2 bg-sky-500/10 rounded-full border border-sky-500/20 w-fit">
                            <Building2 size={16} className="text-sky-400" />
                            <span className="text-[11px] font-black text-sky-400 uppercase tracking-[0.3em]">Nuestra Identidad</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase max-w-5xl">
                            ¿Quiénes <span className="text-[#F76B1C]">Somos?</span>
                        </h1>
                        
                        <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-[#F76B1C] to-transparent rounded-full" />
                    </div>
                </div>

                {/* Misión y Visión Section */}
                <NeumorphicPanel 
                    radiance="silver" 
                    className="p-10 md:p-14 relative overflow-hidden group/mission"
                >
                    <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                        <div className="w-24 h-24 bg-[#12161f] rounded-3xl border border-white/5 flex items-center justify-center group-hover/mission:translate-y-[-4px] transition-transform duration-700 shadow-inner">
                            <Target size={40} className="text-[#F76B1C]" />
                        </div>
                        <div className="flex-grow space-y-4">
                            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Misión y Visión</h2>
                            <p className="text-lg text-slate-300 leading-relaxed font-medium">
                                Ramux es una plataforma integral de servicios financieros e innovación tecnológica. 
                                Nuestra misión es <span className="text-white font-bold">democratizar el acceso a herramientas de análisis avanzadas</span>, 
                                educación financiera de calidad y consultoría estratégica, empoderando a individuos 
                                y organizaciones para tomar decisiones informadas en un mercado global dinámico.
                            </p>
                        </div>
                    </div>
                </NeumorphicPanel>

                {/* Founder Section */}
                <div className="grid grid-cols-1 gap-12 pt-8">
                    <NeumorphicPanel 
                        radiance="blue"
                        className="p-10 md:p-16 relative overflow-hidden group/bio"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-[40px] pointer-events-none group-hover/bio:bg-sky-500/10 transition-colors duration-1000" />
                        
                        <div className="flex flex-col space-y-12 relative z-10">
                            {/* Bio Header */}
                            <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                                <div className="p-4 bg-sky-500/10 rounded-2xl border border-sky-500/20">
                                    <UserCircle className="text-sky-400" size={40} />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">Mi Historia</h2>
                                    <div className="flex items-center gap-3">
                                        <div className="h-0.5 w-8 bg-sky-500" />
                                        <p className="text-sky-400 text-xs font-black uppercase tracking-[0.2em]">El Fundador</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bio Content - ALL TEXT IN TWO COLUMNS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-slate-300 leading-relaxed font-medium text-justify">
                                <div className="space-y-6">
                                    <p className="text-lg">
                                        <span className="float-left text-6xl font-black text-[#F76B1C] mr-3 mt-1 leading-none">C</span>
                                        on más de una década liderando proyectos de alto impacto, mi objetivo es potenciar la capacidad de organizaciones y personas en los sectores público, privado y académico. Entiendo la gestión no solo como la administración de recursos, sino como la creación de estrategias que cruzan la comunicación, la tecnología y el desarrollo económico.
                                    </p>
                                    <p>
                                        Mi trayectoria se ha forjado en espacios de toma de decisiones de máxima exigencia. A nivel nacional, integré la Jefatura de Gabinete de Ministros de la Nación, articulando el trabajo entre el Poder Ejecutivo y el Congreso. En Entre Ríos, fui parte del Ministerio de Desarrollo Humano, donde diseñé, ejecuté y administré políticas públicas y fondos de gran escala que continúan transformando realidades, y me desempeñé como asesor legislativo en la Cámara de Diputados, aportando visión de largo plazo a la creación de leyes.
                                    </p>
                                    <p>
                                        Esta sólida base gubernamental se complementa con un fuerte recorrido en el sector privado y electoral. He asesorado en campañas políticas provinciales y nacionales, construyendo discursos, estrategias de medios y posicionamiento orientado a resultados. A la par, he guiado a empresas en sus procesos de rebranding, marketing y transformación digital.
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <p>
                                        La formación y el desarrollo de ecosistemas productivos son pilares en mi carrera. Impulsé alianzas clave como coordinador del Club de Emprendedores de Paraná y en la Escuela de Gestión y Negocios de la Facultad de Ciencias Económicas (UNER), generando vínculos vitales entre la academia y el sector empresario de la región.
                                    </p>
                                    <p>
                                        Hoy, mi enfoque cruza la barrera de lo tradicional. Dedico mis esfuerzos a integrar la inteligencia artificial, el análisis de datos y la educación financiera —incluyendo el perfeccionamiento técnico constante de cara a las normativas de la Comisión Nacional de Valores (CNV)— para crear herramientas tecnológicas y simuladores de mercado que democraticen el acceso al conocimiento y al capital.
                                    </p>
                                    <p className="p-6 bg-white/5 rounded-2xl border border-white/10 italic text-white/90">
                                        "Integrar la inteligencia artificial, el análisis de datos y la educación financiera para crear herramientas tecnológicas que democraticen el acceso al conocimiento y al capital."
                                    </p>
                                </div>
                            </div>

                            {/* Closing Card */}
                            <div className="bg-[#0a0e1a] p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-inner mt-4 group-hover/bio:border-sky-500/30 transition-colors duration-500">
                                <div className="flex flex-col space-y-6">
                                    <p className="text-lg text-slate-200">
                                        Con Ramux, reúno toda esta experiencia y una extensa red de profesionales de excelencia para conformar equipos a medida, brindando consultoría integral y acompañando a organizaciones en su transformación definitiva.
                                    </p>
                                    <div className="flex items-center gap-4 text-[#F76B1C]">
                                        <Zap size={24} className="animate-pulse" />
                                        <p className="text-sm font-black uppercase tracking-[0.3em]">
                                            Bienvenidos al siguiente nivel.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NeumorphicPanel>
                </div>

                {/* FINAL SIGNATURE */}
                <div className="flex flex-col items-center pt-8 pb-12">
                    <div className="h-px w-24 bg-white/10 mb-10" />
                    <div className="text-center group/sign">
                        <h4 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-2 group-hover/sign:text-[#F76B1C] transition-colors">
                            Fernando Silguero Ramirez
                        </h4>
                        <p className="text-[#F76B1C]/60 font-black uppercase tracking-[0.6em] text-xs md:text-sm">
                            CEO & Founder
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Institucional;
