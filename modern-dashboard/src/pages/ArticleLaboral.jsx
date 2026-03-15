import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import { 
    BookOpenText, Scale, TrendingUp, ArrowLeft, Home, 
    CheckCircle2, AlertTriangle, Quote, Info, Landmark, 
    Lightbulb, ShieldCheck, Zap, Globe, MessageSquare,
    ArrowRight
} from 'lucide-react';

const OpinionCard = ({ title, items, type = 'pros', icon: Icon }) => (
    <NeumorphicPanel className="p-8 bg-[#12161f]/60 hover:bg-[#12161f]/80 transition-all duration-500 group flex flex-col h-full border-white/5">
        <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-xl ${type === 'pros' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'} border shadow-inner`}>
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
        </div>
        <ul className="space-y-4 flex-grow">
            {items.map((item, idx) => (
                <li key={idx} className="flex gap-4 group/item">
                    <div className="mt-1 shrink-0">
                        {type === 'pros' ? 
                            <CheckCircle2 size={16} className="text-emerald-500/60" /> : 
                            <AlertTriangle size={16} className="text-rose-500/60" />
                        }
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed font-medium">
                        <span className="text-white font-bold">{item.label}:</span> {item.text}
                    </p>
                </li>
            ))}
        </ul>
    </NeumorphicPanel>
);

const ArticleLaboral = () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto space-y-8 animate-fade-in py-6 px-4">
                
                {/* Simplified Navigation Bar */}
                <div className="flex justify-between items-center bg-[#12161f]/80 p-3 rounded-2xl border border-white/5 shadow-xl">
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

                {/* Hero Header */}
                <NeumorphicPanel 
                    radiance="ramux"
                    className="p-10 md:p-16 relative overflow-hidden group/hero"
                >
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F76B1C]/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10 space-y-8 max-w-5xl">
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                <Landmark size={14} className="text-[#F76B1C]" /> Radar Laboral
                            </span>
                            <span className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                <Globe size={14} className="text-sky-400" /> Ramux Capital
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                            La Nueva Era <br/>
                            <span className="bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent italic">del Trabajo</span>
                        </h1>
                        
                        <p className="text-xl text-[#F76B1C] font-black uppercase tracking-[0.2em] border-l-4 border-[#F76B1C] pl-6">
                            Análisis Técnico de la Ley de Modernización Laboral
                        </p>
                    </div>
                </NeumorphicPanel>

                {/* Simulator CTA Button */}
                <div className="flex justify-center -mt-4 relative z-20">
                    <button
                        onClick={() => navigate('/radar-laboral')}
                        className="group relative px-8 py-4 bg-gradient-to-r from-[#F76B1C] to-orange-600 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(247,107,28,0.3)] hover:shadow-[0_0_50px_rgba(247,107,28,0.5)] transition-all duration-500 hover:scale-[1.02] flex items-center gap-4 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                        <div className="p-2 bg-white/10 rounded-xl">
                            <Zap size={20} className="text-white animate-pulse" />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] leading-none mb-1">Herramienta Exclusiva</p>
                            <p className="text-sm md:text-base font-black text-white uppercase tracking-tight">Prueba nuestro simulador de liquidación laboral</p>
                        </div>
                        <ArrowRight size={20} className="text-white group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Lead Text */}
                <div className="max-w-4xl mx-auto py-12">
                    <div className="relative">
                        <Quote className="absolute -left-12 -top-6 text-white/5" size={80} />
                        <p className="text-2xl md:text-3xl font-medium text-slate-200 leading-relaxed italic">
                            "Estamos presenciando un cambio de paradigma estructural: la transición de un modelo fundamentado en la alta protección al finalizar el contrato, hacia un esquema diseñado para reducir drásticamente las barreras de entrada a la formalidad."
                        </p>
                    </div>
                </div>

                {/* Core Analysis Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-[#12161f]/80 p-4 rounded-2xl border border-white/5 w-fit">
                        <div className="p-2 bg-[#F76B1C]/10 rounded-xl border border-[#F76B1C]/20 shadow-inner">
                            <Scale className="text-[#F76B1C]" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Pros y Contras del Esquema</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Sector Empleador */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 px-2">
                                <Zap size={18} className="text-sky-400" />
                                <h3 className="text-base font-black text-sky-400 uppercase tracking-[0.2em]">Sector Empleador</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <OpinionCard 
                                    title="Oportunidades"
                                    type="pros"
                                    icon={TrendingUp}
                                    items={[
                                        { label: "Previsibilidad", text: "El nuevo Fondo de Asistencia Laboral (FAL) permite anticipar y provisionar el costo de desvinculaciones." },
                                        { label: "Flexibilidad Operativa", text: "El banco de horas permite adaptar jornadas a picos reales de demanda." },
                                        { label: "Menor Litigiosidad", text: "Topes en intereses de juicios (IPC + 3%) y costas legales." }
                                    ]}
                                />
                                <OpinionCard 
                                    title="Riesgos"
                                    type="cons"
                                    icon={AlertTriangle}
                                    items={[
                                        { label: "Desafío ARCA", text: "La transición administrativa hacia nuevas plataformas representará un desafío operativo inicial." },
                                        { label: "Gestión Interna", text: "Riesgo de burnout y rotación si el banco de horas se usa sin liderazgo empático." }
                                    ]}
                                />
                            </div>
                        </div>

                        {/* Sector Empleado */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 px-2">
                                <Zap size={18} className="text-emerald-400" />
                                <h3 className="text-base font-black text-emerald-400 uppercase tracking-[0.2em]">Sector Empleado</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <OpinionCard 
                                    title="Oportunidades"
                                    type="pros"
                                    icon={CheckCircle2}
                                    items={[
                                        { label: "Expectativa de Empleo", text: "Abaratamiento del riesgo de contratación genera expectativa de mayor empleo registrado." },
                                        { label: "Flexibilidad Pactada", text: "Apertura a esquemas híbridos y fraccionamiento de vacaciones." },
                                        { label: "Economía Gig", text: "Marco de contención para trabajadores de plataformas y colaboradores." }
                                    ]}
                                />
                                <OpinionCard 
                                    title="Riesgos"
                                    type="cons"
                                    icon={AlertTriangle}
                                    items={[
                                        { label: "Impacto Salarial", text: "Reducción de indemnizaciones al excluir aguinaldo y bonos del cálculo base." },
                                        { label: "Dilución de Herramientas", text: "El banco de horas puede diluir el cobro de horas extras tradicionales." },
                                        { label: "Asimetría", text: "Convenios por empresa pueden generar desventaja en la negociación individual." }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reality Check Block */}
                <NeumorphicPanel className="p-10 md:p-14 bg-gradient-to-br from-[#1a1c24] to-[#12141a] border-l-4 border-amber-500/50">
                    <div className="flex items-center gap-4 mb-8 text-amber-500">
                        <MessageSquare size={32} />
                        <h2 className="text-3xl font-black uppercase tracking-tight">El Baño de Realidad: ¿Es el camino "correcto"?</h2>
                    </div>
                    <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-medium">
                        <p>
                            El modelo hiper-proteccionista anterior fracasó en su objetivo más básico: dejó a casi la mitad de la fuerza laboral argentina en la informalidad total. La extrema rigidez protegió a quienes ya estaban dentro del sistema, pero blindó las puertas para quienes estaban fuera.
                        </p>
                        <p className="border-l-2 border-white/10 pl-6 italic">
                            "Si en los próximos años la flexibilización genera empleo formal genuino y sostenido, habrá sido un acierto histórico. Si, por el contrario, las herramientas se utilizan únicamente para precarizar posiciones existentes, el modelo habrá fracasado."
                        </p>
                    </div>
                </NeumorphicPanel>

                {/* Global Trends Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 bg-[#12161f] rounded-3xl border border-white/5 space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                            <ShieldCheck className="text-violet-400" size={24} />
                        </div>
                        <h4 className="text-xl font-black text-white uppercase italic">Mochila Austríaca</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">El FAL replica el modelo europeo de provisionar mes a mes el costo de salida, siendo portable para el trabajador.</p>
                    </div>
                    <div className="p-8 bg-[#12161f] rounded-3xl border border-white/5 space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <Lightbulb className="text-emerald-400" size={24} />
                        </div>
                        <h4 className="text-xl font-black text-white uppercase italic">Flexiguridad</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">Combinación de facilidad para contratar y despedir con un sector privado que reentrena e inserta talento.</p>
                    </div>
                    <div className="p-8 bg-[#12161f] rounded-3xl border border-white/5 space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                            <Zap className="text-sky-400" size={24} />
                        </div>
                        <h4 className="text-xl font-black text-white uppercase italic">Productividad</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">El banco de horas cristaliza una economía que mide la productividad por resultados, no por horas silla.</p>
                    </div>
                </div>

                {/* Conclusion CTA */}
                <NeumorphicPanel 
                    radiance="ramux"
                    className="p-10 md:p-14 border-t border-white/5 overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-grow space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight italic">
                                El Círculo Virtuoso: <br/>
                                <span className="text-[#F76B1C]">Fin del juego de suma cero</span>
                            </h2>
                            <p className="text-slate-300 text-lg leading-relaxed font-medium">
                                El éxito de esta modernización dependerá de la capacidad de empleadores y empleados para reconocerse como socios en la viabilidad y el crecimiento del mismo ecosistema.
                            </p>
                            <div className="flex flex-wrap gap-6 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">Transparencia Genuina</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#F76B1C]" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">Ganancias Compartidas</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-sky-400" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">Upskilling Constante</span>
                                </div>
                            </div>
                        </div>
                        <div className="shrink-0">
                            <div className="w-32 h-32 rounded-full border-2 border-dashed border-[#F76B1C]/30 flex items-center justify-center animate-spin-slow">
                                <TrendingUp size={40} className="text-[#F76B1C]" />
                            </div>
                        </div>
                    </div>
                </NeumorphicPanel>

                {/* Author Footer */}
                <div className="pt-12 text-center space-y-4 pb-20">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Autor & Análisis</p>
                    <div className="h-px w-24 bg-white/10 mx-auto" />
                    <p className="text-sm font-black text-white uppercase tracking-widest">Fernando Silguero Ramirez</p>
                    <p className="text-[10px] text-[#F76B1C] font-bold uppercase tracking-widest">Sección: Radar Laboral | Ramux Capital</p>
                </div>
            </div>
        </Layout>
    );
};

export default ArticleLaboral;
