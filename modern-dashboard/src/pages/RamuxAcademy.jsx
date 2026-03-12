import React from 'react';
import CourseCard from '../components/academy/CourseCard';
import AcademySidebar from '../components/academy/AcademySidebar';
import GlassPanel from '../components/ui/GlassPanel';
import { Target, Activity, Zap, Users, BarChart2, Scale, Cpu, Network } from 'lucide-react';

const RamuxAcademy = () => {

    const financeModules = [
        {
            title: "Certificación de Idoneidad CNV (Ley 26.831)",
            desc: "Preparación intensiva enfocada en el marco legal vigente y operativa bursátil local.",
            level: "Experto",
            isAppliedTheory: true,
            hasSimulator: false,
            icon: Scale
        },
        {
            title: "Análisis Técnico con Simulador",
            desc: "Aplicación práctica de análisis técnico y gestión de carteras en tiempo real.",
            level: "Introductorio",
            isAppliedTheory: true,
            hasSimulator: true,
            icon: BarChart2
        }
    ];

    const aiModules = [
        {
            title: "Productividad con IA",
            desc: "Introducción a herramientas generativas para potenciar la eficiencia personal.",
            level: "Introductorio",
            isAppliedTheory: true,
            hasSimulator: false,
            icon: Cpu
        },
        {
            title: "Automatización Low-Code",
            desc: "Creación de flujos de trabajo inteligentes sin código complejo utilizando n8n y más.",
            level: "Experto",
            isAppliedTheory: true,
            hasSimulator: false,
            icon: Zap
        }
    ];

    const leadershipModules = [
        {
            title: "Liderazgo en la Era Digital",
            desc: "Estrategias de conducción de equipos en entornos remotos y altamente tecnológicos.",
            level: "Introductorio",
            isAppliedTheory: false,
            hasSimulator: false,
            icon: Network
        },
        {
            title: "Gestión Estratégica de RRHH",
            desc: "Alineando el crecimiento humano con la eficiencia de los procesos corporativos.",
            level: "Experto",
            isAppliedTheory: true,
            hasSimulator: false,
            icon: Users
        }
    ];

    return (
        <div className="antialiased min-h-screen flex flex-col font-sans text-slate-100 bg-[#050505] selection:bg-sky-500/30 relative overflow-x-hidden">
            {/* Dark Mode Fixed Background */}
            <div className="fixed inset-0 z-[-2] bg-[#020617]"></div>
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/20 via-[#020617] to-[#020617] opacity-80 pointer-events-none"></div>

            <main className="flex-grow pt-8 pb-12 px-4 max-w-[1400px] mx-auto w-full animate-fade-in relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT COLUMN: Academy Sidebar (3 cols) */}
                    <div className="hidden lg:block lg:col-span-3 sticky top-8 h-[calc(100vh-4rem)]">
                        <AcademySidebar />
                    </div>

                    {/* RIGHT COLUMN: Main Content (9 cols) */}
                    <div className="lg:col-span-9 space-y-10">

                        {/* HERO SECTION */}
                        <div className="flex flex-col md:flex-row gap-6 items-stretch">
                            <GlassPanel className="flex-grow p-8 bg-gradient-to-br from-[#0c1322] to-[#060b14] border-sky-500/30 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
                                <div className="relative z-10 h-full flex flex-col justify-center">
                                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">
                                        PANEL DE FORMACIÓN ESTRATÉGICA
                                    </h1>
                                    <p className="text-slate-400 mb-8 max-w-xl text-lg">
                                        Transformando el conocimiento en capacidad operativa medible.
                                    </p>

                                    <button className="flex items-center gap-3 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] border border-emerald-400/50 hover:scale-[1.02] w-fit">
                                        <Activity size={20} />
                                        <span>Acceso Directo al Simulador</span>
                                    </button>
                                </div>
                            </GlassPanel>

                            {/* Progress Widget */}
                            <GlassPanel className="w-full md:w-80 p-6 flex flex-col justify-center items-center text-center border-white/5 bg-[#0a101d]/80">
                                <Target size={32} className="text-sky-400 mb-4" />
                                <h3 className="text-slate-300 font-bold mb-1">Progreso General</h3>
                                <div className="text-4xl font-black text-white mb-4">35<span className="text-xl text-slate-500">%</span></div>
                                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                                    <div className="bg-gradient-to-r from-sky-400 to-violet-500 h-full w-[35%] rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-4 uppercase tracking-wider font-bold">Nivel: Consultor Junior</p>
                            </GlassPanel>
                        </div>

                        {/* GRIDS CATEGORIAS */}

                        {/* EJE 1: Finanzas y Mercados */}
                        <div className="space-y-6 relative">
                            <div className="flex items-center gap-3 mb-2 border-b border-sky-900/50 pb-4">
                                <div className="p-2 bg-sky-500/10 rounded-lg">
                                    <BarChart2 className="text-sky-400" size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-orbitron">Eje 1: Finanzas y Mercados</h2>
                                    <p className="text-sky-400/80 text-sm font-mono mt-1">Regulación, Análisis y Estrategia Bursátil</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {financeModules.map((mod, idx) => (
                                    <CourseCard key={idx} course={mod} type="finance" />
                                ))}
                            </div>
                        </div>

                        {/* EJE 2: IA y Transformación */}
                        <div className="space-y-6 relative mt-12">
                            <div className="flex items-center gap-3 mb-2 border-b border-cyan-900/50 pb-4">
                                <div className="p-2 bg-cyan-500/10 rounded-lg">
                                    <Zap className="text-cyan-400" size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-orbitron">Eje 2: IA y Transformación</h2>
                                    <p className="text-cyan-400/80 text-sm font-mono mt-1">Automatización y Redes Neuronales</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {aiModules.map((mod, idx) => (
                                    <CourseCard key={idx} course={mod} type="ai" />
                                ))}
                            </div>
                        </div>

                        {/* EJE 3: Liderazgo y Talento */}
                        <div className="space-y-6 relative mt-12 pb-12">
                            <div className="flex items-center gap-3 mb-2 border-b border-slate-700/50 pb-4">
                                <div className="p-2 bg-slate-500/10 rounded-lg">
                                    <Users className="text-slate-300" size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-orbitron">Eje 3: Liderazgo y Talento</h2>
                                    <p className="text-slate-400/80 text-sm font-mono mt-1">Gestión Humana y Habilidades Directivas</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {leadershipModules.map((mod, idx) => (
                                    <CourseCard key={idx} course={mod} type="leadership" />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default RamuxAcademy;
