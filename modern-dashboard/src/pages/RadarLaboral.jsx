import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import LaborLawCalculator from '../components/widgets/LaborLawCalculator';
import { 
    Scale, Building2, UserCircle, Search, FileText, 
    ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, 
    Briefcase, Landmark, Info, ChevronDown, ChevronUp, Users,
    ArrowLeft, Home, Zap
} from 'lucide-react';

const AccordionItem = ({ title, children, isOpen, onToggle, icon: Icon, iconColor }) => (
    <NeumorphicPanel 
        inset={false}
        className="mb-4 overflow-hidden bg-slate-900/40"
    >
        <button 
            onClick={onToggle}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors group"
        >
            <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl bg-[#12161f] border border-white/5 shadow-inner transition-transform group-hover:scale-110`}>
                    <Icon size={20} className={iconColor} />
                </div>
                <span className="font-black text-slate-200 uppercase tracking-tight text-sm">{title}</span>
            </div>
            {isOpen ? <ChevronUp size={20} className="text-slate-500" /> : <ChevronDown size={20} className="text-slate-500" />}
        </button>
        <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="p-6 pt-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 bg-[#0a0e1a]/30">
                {children}
            </div>
        </div>
    </NeumorphicPanel>
);

const ChangeAnnotatorCard = () => (
    <NeumorphicPanel 
        accent={true}
        className="p-8 bg-gradient-to-br from-[#1a1c24] to-[#12141a] border-l-4 border-amber-500/50"
    >
        <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <FileText className="text-amber-500" size={24} />
            </div>
            <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Anotador de Cambios</h3>
                <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.3em]">Ley de Modernización Laboral 2026</p>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors group">
                    <div className="mt-1"><CheckCircle2 size={16} className="text-amber-500" /></div>
                    <div>
                        <h4 className="text-xs font-black text-slate-200 uppercase mb-1">Fondo de Asistencia Laboral (FAL)</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">Implementación de cuentas individuales de capitalización para el cese laboral.</p>
                    </div>
                </div>
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors group">
                    <div className="mt-1"><CheckCircle2 size={16} className="text-amber-500" /></div>
                    <div>
                        <h4 className="text-xs font-black text-slate-200 uppercase mb-1">Período de Prueba Extendido</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">Escalas de 6, 8 y hasta 12 meses según la dotación de la empresa.</p>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors group">
                    <div className="mt-1"><CheckCircle2 size={16} className="text-amber-500" /></div>
                    <div>
                        <h4 className="text-xs font-black text-slate-200 uppercase mb-1">Esquema Independientes</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">Nuevo marco: 1 emprendedor + hasta 3 colaboradores sin dependencia.</p>
                    </div>
                </div>
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors group">
                    <div className="mt-1"><CheckCircle2 size={16} className="text-amber-500" /></div>
                    <div>
                        <h4 className="text-xs font-black text-slate-200 uppercase mb-1">Base Indemnizatoria</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">Exclusión explícita de SAC, premios y propinas del cálculo base.</p>
                    </div>
                </div>
            </div>
        </div>
    </NeumorphicPanel>
);

const RadarLaboral = () => {
    const navigate = useNavigate();
    const [activePerspective, setActivePerspective] = useState('employer'); // 'employer' or 'employee'
    const [openAccordion, setOpenAccordion] = useState(null);

    // Force scroll to top on mount
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleAccordion = (id) => setOpenAccordion(openAccordion === id ? null : id);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in py-6">
                
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

                {/* Hero / Header Section */}
                <NeumorphicPanel 
                    radiance="amber"
                    className="p-8 md:p-12 relative overflow-hidden group/hero"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[64px] pointer-events-none group-hover/hero:bg-sky-500/15 transition-all duration-1000" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left w-full">
                        <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                            <div className="w-24 h-24 rounded-[2rem] bg-[#12161f] border border-white/10 flex items-center justify-center shadow-inner group/icon shrink-0">
                                <Scale className="text-sky-400 group-hover/icon:scale-110 transition-transform duration-500" size={48} />
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center justify-center md:justify-start gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 w-fit mb-4 mx-auto md:mx-0">
                                    <ShieldCheck size={14} className="text-sky-400" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">LegalTech Architecture</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase">
                                    Radar <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">Laboral</span>
                                </h1>
                                <p className="text-lg text-slate-400 max-w-xl leading-relaxed font-medium mt-2 mx-auto md:mx-0">
                                    Inteligencia Normativa & Gestión Estratégica de Capital Humano.
                                </p>
                            </div>
                        </div>
                    </div>
                </NeumorphicPanel>

                {/* Main Content Grid with New Hierarchy */}
                <div className="max-w-4xl mx-auto space-y-8">
                    <ChangeAnnotatorCard />

                    {/* Perspective Selector Moved Here */}
                    <div className="flex justify-center">
                        <div className="flex p-1.5 bg-[#0a0e1a]/60 rounded-2xl border border-white/5 shadow-2xl relative backdrop-blur-md w-full max-w-md">
                            <button 
                                onClick={() => setActivePerspective('employer')}
                                className={`flex-1 flex items-center justify-center gap-3 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 z-10 ${activePerspective === 'employer' ? 'bg-sky-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <Building2 size={16} /> Empleador
                            </button>
                            <button 
                                onClick={() => setActivePerspective('employee')}
                                className={`flex-1 flex items-center justify-center gap-3 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 z-10 ${activePerspective === 'employee' ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <UserCircle size={16} /> Empleado
                            </button>
                    </div>
                </div>
            </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Perspective Viewport */}
                    <div className="lg:col-span-12 space-y-8">
                        
                        {activePerspective === 'employer' ? (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center gap-4 bg-[#12161f]/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                                    <div className="p-2.5 bg-sky-500/10 rounded-xl border border-sky-500/20">
                                        <ShieldCheck className="text-sky-400" size={20} />
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-lg font-black text-white uppercase tracking-tight">Optimización & Riesgo</h2>
                                        <p className="text-sky-400/60 text-[9px] font-black uppercase tracking-widest">Estrategia Patronal 2026</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AccordionItem 
                                        title="Eliminación de Multas" 
                                        isOpen={openAccordion === 'emp1'} 
                                        onToggle={() => toggleAccordion('emp1')}
                                        icon={Landmark}
                                        iconColor="text-sky-400"
                                    >
                                        <p className="mb-4 text-slate-300 font-medium">Fin de la industria del juicio por falta de registro.</p>
                                        <ul className="space-y-2 text-slate-400">
                                            <li className="flex gap-2"><div className="w-1 h-1 bg-sky-400 rounded-full mt-2" /> <span>Derogación de multas Ley 24.013 y 25.323.</span></li>
                                            <li className="flex gap-2"><div className="w-1 h-1 bg-sky-400 rounded-full mt-2" /> <span>Incentivo a la regularización espontánea.</span></li>
                                            <li className="flex gap-2"><div className="w-1 h-1 bg-sky-400 rounded-full mt-2" /> <span>Validación ARCA simplificada.</span></li>
                                        </ul>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="Previsibilidad con FAL" 
                                        isOpen={openAccordion === 'emp2'} 
                                        onToggle={() => toggleAccordion('emp2')}
                                        icon={ShieldCheck}
                                        iconColor="text-sky-400"
                                    >
                                        <p className="mb-4 text-slate-300 font-medium">Control total sobre los costos de salida.</p>
                                        <div className="bg-sky-500/5 p-4 rounded-xl border border-sky-500/10">
                                            <p className="text-[11px] text-slate-400 leading-relaxed">
                                                El Fondo de Asistencia Laboral reemplaza la incertidumbre de la indemnización tradicional por un aporte mensual previsible.
                                            </p>
                                        </div>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="Tasa de Interés Judicial" 
                                        isOpen={openAccordion === 'emp3'} 
                                        onToggle={() => toggleAccordion('emp3')}
                                        icon={Scale}
                                        iconColor="text-sky-400"
                                    >
                                        <p className="mb-4 text-slate-300 font-medium">Tope a la actualización de créditos laborales.</p>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-[11px] text-slate-400 uppercase font-black">IPC + 3% Anual (Tope máximo)</div>
                                            <p className="text-[10px] text-slate-500 italic">Evita la duplicación astronómica de capital en procesos largos.</p>
                                        </div>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="Incentivos MiPyME" 
                                        isOpen={openAccordion === 'emp4'} 
                                        onToggle={() => toggleAccordion('emp4')}
                                        icon={Briefcase}
                                        iconColor="text-sky-400"
                                    >
                                        <p className="text-slate-400 leading-relaxed italic">
                                            Reducción de contribuciones para empleadores que incrementen su planta de personal bajo la Ley 27.802.
                                        </p>
                                    </AccordionItem>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center gap-4 bg-[#12161f]/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                                    <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                        <CheckCircle2 className="text-emerald-400" size={20} />
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-lg font-black text-white uppercase tracking-tight">Cambios & Derechos</h2>
                                        <p className="text-emerald-500/60 text-[9px] font-black uppercase tracking-widest">Visión Trabajador 2026</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AccordionItem 
                                        title="Portabilidad del Cese" 
                                        isOpen={openAccordion === 'enp1'} 
                                        onToggle={() => toggleAccordion('enp1')}
                                        icon={CheckCircle2}
                                        iconColor="text-emerald-400"
                                    >
                                        <p className="mb-4 text-slate-300 font-medium">Cobro garantizado independientemente del motivo.</p>
                                        <ul className="space-y-2 text-slate-400 text-[11px]">
                                            <li className="flex gap-2"><div className="w-1 h-1 bg-emerald-400 rounded-full mt-2" /> <span>El fondo es propiedad del trabajador.</span></li>
                                            <li className="flex gap-2"><div className="w-1 h-1 bg-emerald-400 rounded-full mt-2" /> <span>Se percibe incluso ante renuncia voluntaria.</span></li>
                                            <li className="flex gap-2"><div className="w-1 h-1 bg-emerald-400 rounded-full mt-2" /> <span>Portabilidad entre diferentes empleos.</span></li>
                                        </ul>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="Libertad de Jornada" 
                                        isOpen={openAccordion === 'enp2'} 
                                        onToggle={() => toggleAccordion('enp2')}
                                        icon={Zap}
                                        iconColor="text-emerald-400"
                                    >
                                        <p className="mb-4 text-slate-300 font-medium">Flexibilidad pactada y banco de horas.</p>
                                        <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                                            <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                                Posibilidad de acordar regímenes de jornada flexible y compensación de horas según las necesidades de formación o vida personal.
                                            </p>
                                        </div>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="Alertas de Estabilidad" 
                                        isOpen={openAccordion === 'enp3'} 
                                        onToggle={() => toggleAccordion('enp3')}
                                        icon={AlertTriangle}
                                        iconColor="text-rose-400"
                                    >
                                        <p className="mb-4 text-slate-300 font-medium text-rose-400">Impacto en la antigüedad y base salarial.</p>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-rose-500/5 rounded-lg border border-rose-500/10 text-[11px] text-slate-400">
                                                <span className="font-black text-rose-500 uppercase block mb-1">Período de Prueba</span>
                                                Extensión sustancial (6 a 12 meses) reduciendo la protección inicial contra el despido.
                                            </div>
                                            <div className="p-3 bg-rose-500/5 rounded-lg border border-rose-500/10 text-[11px] text-slate-400">
                                                <span className="font-black text-rose-500 uppercase block mb-1">Base Indemnizatoria</span>
                                                Reducción del monto global al excluir SAC y premios adicionales.
                                            </div>
                                        </div>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="Trabajo No Registrado" 
                                        isOpen={openAccordion === 'enp4'} 
                                        onToggle={() => toggleAccordion('enp4')}
                                        icon={AlertTriangle}
                                        iconColor="text-rose-500"
                                    >
                                        <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                                            <p className="text-xs font-black text-rose-400 uppercase tracking-widest mb-2">Telegrama Gratuito</p>
                                            <p className="text-[11px] text-slate-400">Derecho a regularización mediante intimación fehaciente (Ley 23.789).</p>
                                        </div>
                                    </AccordionItem>
                                </div>
                            </div>
                        )}

                        {/* Labor Law Calculator Widget */}
                        <div className="pt-8">
                            <NeumorphicPanel className="p-8 bg-gradient-to-br from-[#1c2230] to-[#12161f]">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center shadow-inner">
                                            <Zap className="text-amber-500" size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Simulador Predictivo</h3>
                                            <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em]">Cálculo Técnico de Liquidaciones</p>
                                        </div>
                                    </div>
                                    
                                    <div className="px-4 py-2 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Motor LegalTech v2.0</span>
                                    </div>
                                </div>
                                <LaborLawCalculator />
                            </NeumorphicPanel>
                        </div>
                    </div>
                </div>

                {/* Professional Services Widget */}
                <NeumorphicPanel 
                    radiance="ramux"
                    className="p-10 md:p-14 mt-12 relative overflow-hidden group/services border-t border-sky-500/10"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[64px] pointer-events-none group-hover/services:bg-[#F76B1C]/5 transition-all duration-1000" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                        <div className="md:col-span-12 lg:col-span-7">
                            <div className="flex items-center gap-3 px-4 py-1.5 bg-[#F76B1C]/10 rounded-full border border-[#F76B1C]/20 w-fit mb-6">
                                <Briefcase size={14} className="text-[#F76B1C]" />
                                <span className="text-[10px] font-black text-[#F76B1C] uppercase tracking-[0.3em]">Asesoría de Alto Impacto</span>
                            </div>
                            
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9]">
                                Potenciá la gestión de <br />
                                <span className="bg-gradient-to-r from-[#F76B1C] to-amber-500 bg-clip-text text-transparent">tus recursos humanos</span>
                            </h2>
                            
                            <p className="text-lg text-slate-400 leading-relaxed mb-10 font-medium">
                                Integramos el rigor normativo con la agilidad tecnológica. Elevamos los estándares de tu organización mediante soluciones estratégicas diseñadas por expertos.
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-4">
                                {[
                                    "Gestión de RRHH 360°",
                                    "Selección & Headhunting",
                                    "Liquidación de Sueldos",
                                    "Auditoría LegalTech"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 group/item">
                                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center transition-transform group-hover/item:scale-110">
                                            <CheckCircle2 size={12} className="text-emerald-500" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-300 uppercase tracking-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="md:col-span-12 lg:col-span-5 lg:mt-12">
                            <NeumorphicPanel inset className="p-8 bg-slate-900/60 flex flex-col items-center lg:items-end text-center lg:text-right">
                                <div className="space-y-1 mb-8">
                                    <p className="text-2xl font-black text-white tracking-tighter uppercase">Fernando Silguero</p>
                                    <p className="text-[#F76B1C] font-black text-[10px] uppercase tracking-[0.4em] leading-none mb-2">Ceo & founder ramux</p>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest italic opacity-60">RRHH - FCECO - UNER</p>
                                </div>
                                
                                <div className="flex flex-col gap-4 w-full">
                                    <a 
                                        href="https://wa.me/message/WATOKPKLCBMPK1"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full py-4 bg-[#F76B1C] hover:bg-[#ff8a4d] text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_10px_30px_rgba(247,107,28,0.3)] hover:shadow-[0_15px_40px_rgba(247,107,28,0.4)] flex items-center justify-center gap-3 text-sm no-underline group/wa"
                                    >
                                        Solicitar Consultoria 
                                        <ArrowRight size={18} className="group-hover/wa:translate-x-1 transition-transform" />
                                    </a>
                                    
                                    <a 
                                        href="mailto:Holaramux@gmail.com"
                                        className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors py-2"
                                    >
                                        Holaramux@gmail.com
                                    </a>
                                </div>
                            </NeumorphicPanel>
                        </div>
                    </div>
                </NeumorphicPanel>
            </div>
        </Layout>
    );
};

export default RadarLaboral;
