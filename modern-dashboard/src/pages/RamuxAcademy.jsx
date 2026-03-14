import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import CourseCard from '../components/academy/CourseCard';
import { 
    Target, 
    Activity, 
    Zap, 
    Users, 
    BarChart2, 
    Scale, 
    Cpu, 
    Network,
    GraduationCap,
    Compass,
    Coins,
    ShieldCheck,
    ArrowLeft,
    Home
} from 'lucide-react';

const RamuxAcademy = () => {
    const navigate = useNavigate();

    // Force scroll to top on mount
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const legalModules = [
        {
            title: "Certificación de Idoneidad CNV",
            desc: "Preparación intensiva enfocada en el marco legal vigente y operativa bursátil local. Orientado a la Ley 26.831.",
            level: "Experto",
            isAppliedTheory: true,
            hasSimulator: false,
            icon: Scale
        }
    ];

    const globalModules = [
        {
            title: "Expansión y Comercio Exterior",
            desc: "internacionalización y gestión de flujos comerciales globales para empresas modernas.",
            level: "Intermedio",
            isAppliedTheory: true,
            hasSimulator: false,
            icon: Compass
        }
    ];

    const wealthModules = [
        {
            title: "Análisis Técnico y Mercados",
            desc: "Aplicación práctica de herramientas de análisis y gestión de carteras en tiempo real.",
            level: "Introductorio",
            isAppliedTheory: true,
            hasSimulator: true,
            icon: BarChart2
        }
    ];

    const aiModules = [
        {
            title: "Productividad con IA",
            desc: "Dominio de herramientas generativas para potenciar la eficiencia operativa.",
            level: "Introductorio",
            isAppliedTheory: true,
            hasSimulator: false,
            icon: Cpu
        },
        {
            title: "Automatización Low-Code",
            desc: "Flujos inteligentes con n8n y arquitecturas modernas.",
            level: "Experto",
            isAppliedTheory: true,
            hasSimulator: false,
            icon: Zap
        }
    ];

    const leadershipModules = [
        {
            title: "Liderazgo en la Era Digital",
            desc: "Estrategias de conducción de equipos tecnológicos en entornos globales.",
            level: "Introductorio",
            isAppliedTheory: false,
            hasSimulator: false,
            icon: Network
        }
    ];

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto space-y-6 animate-fade-in py-6 px-4">
                
                {/* Simplified Navigation Bar */}
                <div className="flex justify-between items-center bg-[#12161f]/40 p-3 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-5 py-2 bg-slate-800/50 hover:bg-[#F76B1C] text-slate-300 hover:text-white rounded-xl transition-all border border-slate-700 hover:border-[#F76B1C] text-[10px] font-black uppercase tracking-widest group"
                    >
                        <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                        Volver
                    </button>
                    
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center justify-center p-2.5 bg-sky-900/30 hover:bg-sky-500 text-sky-400 hover:text-white rounded-xl transition-all border border-sky-500/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] group"
                    >
                        <Home size={16} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Hero / Welcome Panel */}
                <div className="flex flex-col xl:flex-row gap-4 items-stretch">
                    <NeumorphicPanel 
                        radiance="ramux"
                        className="flex-grow p-8 md:p-10 relative overflow-hidden group/hero min-h-[220px]"
                    >
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none group-hover/hero:bg-[#F76B1C]/15 transition-all duration-1000" />
                        
                        <div className="relative z-10 flex flex-col justify-center h-full space-y-4">
                            <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 w-fit">
                                <GraduationCap size={14} className="text-[#F76B1C]" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Knowledge Hub</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter uppercase max-w-2xl">
                                Ramux <span className="bg-gradient-to-r from-violet-500 to-[#F76B1C] bg-clip-text text-transparent">Academy</span>
                            </h1>
                            
                            <p className="text-lg text-slate-400 max-w-xl leading-relaxed font-medium">
                                Transformando el conocimiento estratégico en capacidad operativa de alto impacto.
                            </p>
                        </div>
                    </NeumorphicPanel>

                    {/* Quick Stats / Progress */}
                    <NeumorphicPanel radiotherapy="silver" className="w-full xl:w-96 p-6 flex flex-row xl:flex-col justify-between xl:justify-center items-center text-center gap-6">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 bg-[#12161f] rounded-2xl border border-white/5 flex items-center justify-center shadow-inner relative group/stat">
                                <Target size={20} className="text-sky-400 group-hover/stat:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-slate-400 font-black text-[9px] uppercase tracking-widest hidden xl:block">Progreso Global</h3>
                        </div>
                        
                        <div className="flex flex-col items-center xl:space-y-1">
                            <div className="text-4xl font-black text-white tracking-tighter">35<span className="text-xl text-slate-500 font-medium">%</span></div>
                            <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em] hidden xl:block">Rango: Consultor Junior</p>
                        </div>

                        <div className="flex-grow xl:w-full space-y-2">
                            <div className="w-full bg-[#0a0e1a] rounded-full h-2 overflow-hidden border border-white/5 shadow-inner">
                                <div className="bg-gradient-to-r from-sky-400 to-violet-500 h-full w-[35%] rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                            </div>
                        </div>
                    </NeumorphicPanel>
                </div>

                {/* ACADEMIC WIDGETS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    
                    {/* Legal Academy Widget */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-4 bg-[#12161f]/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                            <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                <ShieldCheck className="text-amber-500" size={20} />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-black text-white uppercase tracking-tight">Legal</h2>
                                <p className="text-amber-500/60 text-[9px] font-black uppercase tracking-widest">Compliance</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {legalModules.map((mod, idx) => (
                                <CourseCard key={idx} course={mod} type="finance" />
                            ))}
                        </div>
                    </div>

                    {/* Global Academy Widget */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-4 bg-[#12161f]/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <Compass className="text-emerald-500" size={20} />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-black text-white uppercase tracking-tight">Global</h2>
                                <p className="text-emerald-500/60 text-[9px] font-black uppercase tracking-widest">Trade</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {globalModules.map((mod, idx) => (
                                <CourseCard key={idx} course={mod} type="finance" />
                            ))}
                        </div>
                    </div>

                    {/* Wealth Academy Widget */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-4 bg-[#12161f]/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm relative group">
                            <div className="p-2.5 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                <Coins className="text-yellow-500" size={20} />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-black text-white uppercase tracking-tight">Wealth</h2>
                                <p className="text-yellow-500/60 text-[9px] font-black uppercase tracking-widest">Strategy</p>
                            </div>
                            
                            <button className="flex items-center gap-2 px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg transition-all border border-emerald-500/30 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                <Activity size={12} />
                                <span>Simulador</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {wealthModules.map((mod, idx) => (
                                <CourseCard key={idx} course={mod} type="finance" />
                            ))}
                        </div>
                    </div>

                    {/* IA Academy Widget */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-4 bg-[#12161f]/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                            <div className="p-2.5 bg-sky-500/10 rounded-xl border border-sky-500/20">
                                <Zap className="text-sky-400" size={20} />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-black text-white uppercase tracking-tight">IA</h2>
                                <p className="text-sky-400/60 text-[9px] font-black uppercase tracking-widest">Transform</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {aiModules.map((mod, idx) => (
                                <CourseCard key={idx} course={mod} type="ai" />
                            ))}
                        </div>
                    </div>

                    {/* Leadership Academy Widget */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-4 bg-[#12161f]/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                            <div className="p-2.5 bg-violet-500/10 rounded-xl border border-violet-500/20">
                                <Users className="text-violet-500" size={20} />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-black text-white uppercase tracking-tight">Leadership</h2>
                                <p className="text-violet-500/60 text-[9px] font-black uppercase tracking-widest">Talent</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {leadershipModules.map((mod, idx) => (
                                <CourseCard key={idx} course={mod} type="leadership" />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default RamuxAcademy;
