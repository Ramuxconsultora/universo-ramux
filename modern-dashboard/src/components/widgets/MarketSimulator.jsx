import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import { 
    TrendingUp, 
    BarChart2, 
    PieChart, 
    Calendar, 
    ShieldCheck, 
    Activity, 
    FileText, 
    BookOpen, 
    ArrowRight,
    Search
} from 'lucide-react';
import MarketSimulator from '../components/widgets/MarketSimulator.jsx';
import ErrorBoundary from '../components/ui/ErrorBoundary.jsx';

const ToolWidget = (props) => {
    const { icon: Icon, title, subtitle, colorClass = "text-[#F76B1C]" } = props;
    return (
        <NeumorphicPanel className="p-6 bg-[#12161f]/40 hover:bg-[#12161f]/60 transition-all duration-500 group flex flex-col h-full border-white/5">
            <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner group-hover:translate-y-[-4px] transition-transform duration-500`}>
                    <Icon size={20} className={colorClass} />
                </div>
                <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight whitespace-nowrap">{title}</h3>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{subtitle}</p>
                </div>
            </div>
            <div className="flex-grow flex items-center justify-center py-8">
                <div className="w-full h-32 bg-[#0a0e1a]/50 rounded-xl border border-dashed border-white/5 flex items-center justify-center">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">[ Módulo en Desarrollo ]</p>
                </div>
            </div>
            <button className="w-full py-3 mt-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-xl border border-white/5 transition-all text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100">
                Abrir Herramienta
            </button>
        </NeumorphicPanel>
    );
};

const TrainingModule = (props) => {
    const { icon: Icon, title, desc } = props;
    return (
        <NeumorphicPanel className="p-6 bg-[#1a1c24]/80 border-white/5 hover:border-sky-500/30 transition-all">
            <div className="flex gap-4 items-start">
                <div className="p-3 bg-sky-500/10 rounded-xl">
                    <Icon size={20} className="text-sky-400" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">{title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        {desc}
                    </p>
                    <div className="pt-2">
                        <button className="flex items-center gap-2 text-[10px] font-black text-sky-400 uppercase tracking-widest hover:text-white transition-colors">
                            Acceder <ArrowRight size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </NeumorphicPanel>
    );
};

const CapitalWealth = () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto space-y-8 animate-fade-in py-6 px-4 pb-20">
                

                {/* Hero Header */}
                <NeumorphicPanel 
                    radiance="ramux"
                    className="p-10 md:p-16 relative overflow-hidden group/hero"
                >
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F76B1C]/5 rounded-full blur-[40px] opacity-30 pointer-events-none" />
                    <div className="relative z-10 space-y-6 max-w-4xl">
                        <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 w-fit">
                            <TrendingUp size={16} className="text-[#F76B1C]" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Wealth Management</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase italic whitespace-nowrap">
                            Capital & <span className="bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent italic">Wealth</span>
                        </h1>
                        <p className="text-lg text-slate-300 leading-relaxed font-medium border-l-4 border-[#F76B1C] pl-6">
                            Herramientas y asesoramiento especializado en el mercado de capitales. Combinamos el análisis financiero con interfaces tecnológicas intuitivas para que la toma de decisiones de inversión sea estratégica, informada y eficiente.
                        </p>
                    </div>
                </NeumorphicPanel>

                {/* Legal Transparency Notice */}
                <NeumorphicPanel className="p-8 bg-amber-500/5 border border-amber-500/20 relative overflow-hidden">
                    <div className="flex items-start gap-4 relative z-10">
                        <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 mt-1">
                            <ShieldCheck className="text-amber-500" size={20} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest">Aviso de Transparencia Legal</h3>
                            <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                Ramux se encuentra actualmente en proceso de gestión y obtención de la matrícula correspondiente ante la <span className="text-white font-bold">Comisión Nacional de Valores (CNV)</span>. El contenido actual es de carácter educativo y tecnológico; el asesoramiento financiero personalizado quedará habilitado una vez finalizado el marco legal pertinente.
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -mr-16 -mt-16" />
                </NeumorphicPanel>

                {/* Featured Tool: Market Simulator */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-[#12161f]/80 p-4 rounded-xl border border-white/5 w-fit">
                        <div className="p-2 bg-[#F76B1C]/10 rounded-lg border border-[#F76B1C]/20 shadow-inner">
                            <Activity className="text-[#F76B1C]" size={20} />
                        </div>
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Centro de Estrategia Live</h2>
                    </div>
                    <ErrorBoundary>
                        <MarketSimulator />
                    </ErrorBoundary>
                </div>

                {/* Grid de Herramientas Secundarias */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-[#12161f]/80 p-4 rounded-xl border border-white/5 w-fit">
                        <div className="p-2 bg-sky-500/10 rounded-lg border border-sky-500/20 shadow-inner">
                            <Search className="text-sky-400" size={20} />
                        </div>
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Módulos de Análisis</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ToolWidget 
                            icon={Search} 
                            title="Market Scanner AI" 
                            subtitle="Análisis en Tiempo Real"
                            colorClass="text-sky-400"
                        />
                        <ToolWidget 
                            icon={Calendar} 
                            title="Radar de Dividendos" 
                            subtitle="Calendario de Pagos"
                            colorClass="text-emerald-400"
                        />
                        <ToolWidget 
                            icon={PieChart} 
                            title="Wealth Analytics" 
                            subtitle="Salud y Diversificación"
                            colorClass="text-violet-400"
                        />
                        <ToolWidget 
                            icon={ShieldCheck} 
                            title="Risk Evaluator" 
                            subtitle="Perfil de Riesgo"
                            colorClass="text-amber-400"
                        />
                    </div>
                </div>

                {/* Training & Strategy Center */}
                <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-4 bg-[#12161f]/80 p-4 rounded-xl border border-white/5 w-fit">
                        <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 shadow-inner">
                            <BookOpen className="text-indigo-400" size={20} />
                        </div>
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Centro de Formación y Estrategia</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <TrainingModule 
                            icon={FileText}
                            title="Módulo de Idoneidad"
                            desc="Acceso a guías técnicas y conceptos fundamentales del mercado de capitales (basado en normativa CNV). Preparación conceptual para inversores sofisticados."
                        />
                        <TrainingModule 
                            icon={Activity}
                            title="Reportes de Coyuntura"
                            desc="Suscripción a análisis semanales sobre el mercado local e internacional. Reportes estratégicos de macroeconomía y microfinanzas."
                        />
                    </div>
                </div>

                <div className="pt-12 text-center pb-12">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Wealth Architecture • Ramux 2026</p>
                </div>
            </div>
        </Layout>
    );
};

export default CapitalWealth;
