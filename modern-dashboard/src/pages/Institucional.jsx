import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import GlassPanel from '../components/ui/GlassPanel';
import { Building2, Users, ArrowLeft, Home, UserCircle } from 'lucide-react';

const Institucional = () => {
    const navigate = useNavigate();

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

                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                    <Building2 className="text-sky-400" size={32} />
                    <h1 className="text-3xl font-bold text-white">Quiénes Somos</h1>
                </div>

                <GlassPanel className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Misión y Visión</h2>
                    <p className="text-slate-300 leading-relaxed">
                        Ramux es una plataforma integral de servicios financieros e innovación tecnológica.
                        Nuestra misión es democratizar el acceso a herramientas de análisis avanzadas,
                        educación financiera de calidad y consultoría estratégica, empoderando a individuos
                        y organizaciones para tomar decisiones informadas en un mercado global dinámico.
                    </p>
                </GlassPanel>

                <GlassPanel className="p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                        <UserCircle className="text-emerald-400" size={32} />
                        <div>
                            <h2 className="text-2xl font-bold text-white">Mi Historia</h2>
                            <p className="text-slate-400 text-sm mt-1 uppercase tracking-wide">El Fundador</p>
                        </div>
                    </div>

                    <div className="mb-10 text-center md:text-left bg-gradient-to-r from-sky-900/20 to-transparent p-6 rounded-2xl border-l-[4px] border-sky-500">
                        <h3 className="text-2xl font-black text-white mb-2">Fernando Silguero Ramirez</h3>
                        <p className="text-sky-400 font-bold">CEO y Fundador de Ramux | Especialista en Gestión, Comunicación Estratégica e Innovación</p>
                    </div>

                    <div className="space-y-6 text-slate-300 leading-relaxed text-[15px] md:text-base">
                        <p>
                            Con más de una década liderando proyectos de alto impacto, mi objetivo es potenciar la capacidad de organizaciones y personas en los sectores público, privado y académico. Entiendo la gestión no solo como la administración de recursos, sino como la creación de estrategias que cruzan la comunicación, la tecnología y el desarrollo económico.
                        </p>
                        <p>
                            Mi trayectoria se ha forjado en espacios de toma de decisiones de máxima exigencia. A nivel nacional, integré la Jefatura de Gabinete de Ministros de la Nación, articulando el trabajo entre el Poder Ejecutivo y el Congreso. En Entre Ríos, fui parte del Ministerio de Desarrollo Humano, donde diseñé, ejecuté y administré políticas públicas y fondos de gran escala que continúan transformando realidades, y me desempeñé como asesor legislativo en la Cámara de Diputados, aportando visión de largo plazo a la creación de leyes.
                        </p>
                        <p>
                            Esta sólida base gubernamental se complementa con un fuerte recorrido en el sector privado y electoral. He asesorado en campañas políticas provinciales y nacionales, construyendo discursos, estrategias de medios y posicionamiento orientado a resultados. A la par, he guiado a empresas en sus procesos de rebranding, marketing y transformación digital.
                        </p>
                        <p>
                            La formación y el desarrollo de ecosistemas productivos son pilares en mi carrera. Impulsé alianzas clave como coordinador del Club de Emprendedores de Paraná y en la Escuela de Gestión y Negocios de la Facultad de Ciencias Económicas (UNER), generando vínculos vitales entre la academia y el sector empresario de la región.
                        </p>
                        <p>
                            Hoy, mi enfoque cruza la barrera de lo tradicional. Dedico mis esfuerzos a integrar la inteligencia artificial, el análisis de datos y la educación financiera —incluyendo el perfeccionamiento técnico constante de cara a las normativas de la Comisión Nacional de Valores (CNV)— para crear herramientas tecnológicas y simuladores de mercado que democraticen el acceso al conocimiento y al capital.
                        </p>
                        <div className="font-bold text-white italic bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 mt-8 shadow-inner space-y-3">
                            <p>Con Ramux, reúno toda esta experiencia y una extensa red de profesionales de excelencia.</p>
                            <p>Conformamos equipos a medida para brindar consultoría integral, acompañando a organizaciones, instituciones y actores políticos en su transformación definitiva.</p>
                            <p className="text-sky-400 not-italic uppercase tracking-widest text-sm pt-2">Bienvenidos al siguiente nivel.</p>
                        </div>
                    </div>
                </GlassPanel>
            </div>
        </Layout>
    );
};

export default Institucional;
