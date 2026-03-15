import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import { 
    Globe, TrendingUp, Calculator, ShieldCheck, 
    FileSearch, Briefcase, Users, ArrowLeft, Home,
    CheckCircle2, ArrowRight, Info, Landmark, Lightbulb
} from 'lucide-react';

const PilarCard = ({ title, description, icon: Icon, colorClass }) => (
    <NeumorphicPanel 
        className="p-8 bg-slate-900/40 hover:bg-slate-800/60 transition-all duration-500 group flex flex-col h-full"
    >
        <div className={`p-4 rounded-[1.25rem] bg-white/5 ${colorClass} w-fit mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-inner`}>
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-black text-white mb-4 tracking-tight uppercase">{title}</h3>
        <p className="text-slate-300 text-base leading-relaxed font-medium">
            {description}
        </p>
    </NeumorphicPanel>
);

const ExpansionGlobal = () => {
    const navigate = useNavigate();

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
                    radiance="emerald"
                    className="p-8 md:p-12 relative overflow-hidden group/hero"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[64px] pointer-events-none group-hover/hero:bg-emerald-500/15 transition-all duration-1000" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left w-full">
                        <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                            <div className="w-24 h-24 rounded-[2rem] bg-[#12161f] border border-white/10 flex items-center justify-center shadow-inner group/icon shrink-0">
                                <Globe className="text-emerald-400" size={48} />
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center justify-center md:justify-start gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 w-fit mb-4 mx-auto md:mx-0">
                                    <ShieldCheck size={14} className="text-emerald-400" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Global Market Strategy</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase">
                                    Expansión <span className="bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">Global</span>
                                </h1>
                                <p className="text-lg text-slate-300 max-w-xl leading-relaxed font-medium mt-2 mx-auto md:mx-0">
                                    Arquitectura de Negocios Internacionales & Gestión Estratégica.
                                </p>
                            </div>
                        </div>
                    </div>
                </NeumorphicPanel>

                {/* Value Proposition */}
                <NeumorphicPanel 
                    accent={true}
                    className="p-10 bg-gradient-to-br from-[#1a1c24] to-[#12141a] border-l-4 border-emerald-500/50 relative overflow-hidden"
                >
                    <div className="relative z-10 max-w-4xl">
                        <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Rompe fronteras con seguridad estratégica</h2>
                        <p className="text-slate-200 text-lg leading-relaxed font-medium">
                            Internacionalizar una empresa no es solo un trámite aduanero; es una decisión de arquitectura de negocios. En <span className="text-emerald-400 font-black italic">RAMUX</span>, preparamos a las pymes para el comercio exterior mediante una consultoría integral que mitiga riesgos y maximiza márgenes, diferenciándonos de la labor operativa para enfocarnos en la viabilidad real de su expansión.
                        </p>
                    </div>
                    <Globe className="absolute -right-16 -bottom-16 text-emerald-500/5 rotate-12" size={320} />
                </NeumorphicPanel>

                {/* Pilares de Servicio Grid */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4 bg-[#12161f]/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm w-fit">
                        <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-inner">
                            <TrendingUp className="text-emerald-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Pilares Estratégicos</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <PilarCard 
                            title="Inteligencia de Mercados Meta"
                            description="Realizamos un análisis exhaustivo de viabilidad comercial, identificando acuerdos comerciales vigentes, barreras no arancelarias y un estudio detallado de la competencia local en el destino."
                            icon={Landmark}
                            colorClass="text-emerald-400"
                        />
                        <PilarCard 
                            title="Ingeniería de Costos y Pricing"
                            description="Determinamos la estructura de precios bajo Incoterms (FOB, CIF, etc.). Analizamos márgenes reales de exportación/importación para asegurar la rentabilidad financiera en cada operación."
                            icon={Calculator}
                            colorClass="text-sky-400"
                        />
                        <PilarCard 
                            title="Auditoría de Exportabilidad"
                            description="Diagnóstico técnico de producto para certificar que cumple con estándares internacionales. Revisión de etiquetado, embalaje y certificaciones necesarias antes del primer despacho."
                            icon={ShieldCheck}
                            colorClass="text-emerald-400"
                        />
                        <PilarCard 
                            title="Gestión Documental & Back-Office"
                            description="Soporte administrativo integral pre-aduana. Elaboración estratégica de Facturas Proforma, Packing List y documentación comercial necesaria para evitar demoras operativas."
                            icon={FileSearch}
                            colorClass="text-sky-400"
                        />
                        <PilarCard 
                            title="Estrategia de Negociación Intercultural"
                            description="Asesoría personalizada para entender los protocolos de negocios en diferentes regiones del mundo. Adaptamos su discurso comercial para cerrar tratos exitosos."
                            icon={Users}
                            colorClass="text-emerald-400"
                        />
                        <PilarCard 
                            title="Visión Ramux: Estrategia vs. Trámite"
                            description="Nuestra clave es la gestión. Mientras el despachante efectiviza el despacho, nosotros construimos la base estratégica para que ese despacho ocurra con rentabilidad y bajo riesgo."
                            icon={Lightbulb}
                            colorClass="text-amber-400"
                        />
                    </div>
                </div>

                {/* Differential Section */}
                <div className="pt-8">
                    <NeumorphicPanel className="p-10 bg-[#0d111a]/80 border-t border-white/5 relative overflow-hidden group/diff">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[64px] pointer-events-none group-hover/diff:bg-emerald-500/10 transition-all duration-1000" />
                        
                        <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3 relative z-10 uppercase tracking-tighter">
                            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <Info className="text-emerald-400" size={24} />
                            </div>
                            El Diferencial de RAMUX
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
                            <div className="lg:col-span-7 space-y-6">
                                <p className="text-slate-200 text-lg leading-relaxed font-medium">
                                    A diferencia de las agencias de aduana tradicionales, nosotros no solo movemos mercadería; <span className="text-white font-black uppercase tracking-widest text-emerald-400">movemos visión de negocio</span>. 
                                </p>
                                <p className="text-slate-300 text-base leading-relaxed">
                                    Nuestra formación en Gestión de Negocios Internacionales nos permite realizar una integración vertical de la cadena de valor, asegurando que su empresa no solo llegue al puerto, sino que conquiste el mercado.
                                </p>
                            </div>
                            <div className="lg:col-span-5">
                                <ul className="space-y-4 bg-white/5 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                                    <li className="flex items-center gap-4 text-base font-black text-slate-100 uppercase tracking-tight group/li">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover/li:rotate-12 transition-transform">
                                            <CheckCircle2 size={16} className="text-emerald-400" />
                                        </div>
                                        Foco en Rentabilidad Real
                                    </li>
                                    <li className="flex items-center gap-4 text-base font-black text-slate-100 uppercase tracking-tight group/li">
                                        <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20 group-hover/li:rotate-12 transition-transform">
                                            <CheckCircle2 size={16} className="text-sky-400" />
                                        </div>
                                        Mitigación de Riesgos Cambiarios
                                    </li>
                                    <li className="flex items-center gap-4 text-base font-black text-slate-100 uppercase tracking-tight group/li">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover/li:rotate-12 transition-transform">
                                            <CheckCircle2 size={16} className="text-emerald-400" />
                                        </div>
                                        Cumplimiento Normativo Preventivo
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </NeumorphicPanel>
                </div>

                {/* Professional Services Section (CTA) */}
                <div className="mt-20">
                    <NeumorphicPanel 
                        radiance="emerald"
                        className="p-10 md:p-14 relative overflow-hidden group/cta border-t border-emerald-500/10"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[64px] pointer-events-none group-hover/cta:bg-emerald-500/5 transition-all duration-1000" />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                            <div className="lg:col-span-7">
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase leading-tight">
                                    Proyectá tu Empresa <br/>
                                    <span className="bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">al Mundo</span>
                                </h2>
                                <p className="text-slate-200 text-lg leading-relaxed mb-10 font-medium">
                                    En <span className="text-white font-black tracking-[0.2em] uppercase text-emerald-400">RAMUX</span> transformamos pymes locales en actores globales. Solicitá hoy una auditoría de exportabilidad o una consultoría de inteligencia de mercados para tu próximo destino.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        "Auditoría de Expansión", 
                                        "Ingeniería de Precios EXW/FOB", 
                                        "Búsqueda de Mercados Meta", 
                                        "Soporte en Negociación"
                                    ].map((service, idx) => (
                                        <div key={idx} className="flex items-center gap-3 group/item">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center transition-transform group-hover/item:scale-110">
                                                <CheckCircle2 size={12} className="text-emerald-500" />
                                            </div>
                                            <span className="text-base font-bold text-slate-100 uppercase tracking-tight">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-right">
                                <div className="space-y-2 mb-10">
                                    <p className="text-3xl font-black text-white tracking-tighter uppercase mb-1">Fernando Silguero Ramirez</p>
                                    <p className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.4em] leading-none mb-2">Ceo & Founder Ramux</p>
                                    <div className="h-px w-24 bg-gradient-to-l from-emerald-500 to-transparent ml-auto mb-4" />
                                    <p className="text-slate-400 text-xs italic font-medium">Gestión de Negocios Internacionales - FCEco - UNER</p>
                                </div>
                                <a 
                                    href="https://wa.me/message/WATOKPKLCBMPK1"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full sm:w-auto px-10 py-4 bg-white text-slate-950 font-black rounded-[1.25rem] hover:bg-emerald-500 hover:text-white transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 group mb-4 outline-none uppercase text-xs tracking-widest"
                                >
                                    Solicitar Consultoría <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                                </a>
                                <a 
                                    href="mailto:Holaramux@gmail.com"
                                    className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-emerald-400 transition-colors flex items-center gap-3 group"
                                >
                                    Holaramux@gmail.com
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:animate-ping" />
                                </a>
                            </div>
                        </div>
                    </NeumorphicPanel>
                </div>
            </div>
        </Layout>
    );
};

export default ExpansionGlobal;
