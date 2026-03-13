import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import GlassPanel from '../components/ui/GlassPanel';
import { 
    Globe, TrendingUp, Calculator, ShieldCheck, 
    FileSearch, Briefcase, Users, ArrowLeft, Home,
    CheckCircle2, ArrowRight, Info, Landmark, Lightbulb
} from 'lucide-react';

const PilarCard = ({ title, description, icon: Icon, colorClass }) => (
    <GlassPanel className="p-6 border-white/5 bg-slate-900/40 hover:bg-slate-800/60 transition-all duration-300 group">
        <div className={`p-3 rounded-xl bg-white/5 ${colorClass} w-fit mb-4 group-hover:scale-110 transition-transform`}>
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
            {description}
        </p>
    </GlassPanel>
);

const ExpansionGlobal = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
                
                {/* Navigation Bar */}
                <div className="flex items-center justify-between mb-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all text-xs font-bold group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Volver
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all font-bold shadow-lg"
                        title="Ir al Home"
                    >
                        <Home size={18} />
                    </button>
                </div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-white/10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                            <Globe className="text-emerald-400" size={40} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tight">Expansión Global</h1>
                            <p className="text-emerald-400/80 font-mono text-sm mt-1 uppercase tracking-widest">Estrategia & Negocios Internacionales</p>
                        </div>
                    </div>
                </div>

                {/* Value Proposition */}
                <GlassPanel className="p-8 border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl">
                        <h2 className="text-2xl font-bold text-white mb-4">Rompe fronteras con seguridad estratégica</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Internacionalizar una empresa no es solo un trámite aduanero; es una decisión de arquitectura de negocios. En <span className="text-emerald-400 font-bold italic">RAMUX</span>, preparamos a las pymes para el comercio exterior mediante una consultoría integral que mitiga riesgos y maximiza márgenes, diferenciándonos de la labor operativa para enfocarnos en la viabilidad real de su expansión.
                        </p>
                    </div>
                    <Globe className="absolute -right-10 -bottom-10 text-emerald-500/10" size={240} />
                </GlassPanel>

                {/* Pilares de Servicio Grid */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <TrendingUp className="text-emerald-400" size={24} />
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Pilares de Estratégicos</h2>
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
                <div className="pt-10 border-t border-white/5">
                    <div className="bg-slate-900/60 rounded-3xl p-8 border border-white/5">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Info className="text-emerald-400" size={20} />
                            El Diferencial de RAMUX
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    A diferencia de las agencias de aduana tradicionales, nosotros no solo movemos mercadería; <span className="text-white font-bold">movemos visión de negocio</span>. 
                                </p>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Nuestra formación en Gestión de Negocios Internacionales nos permite realizar una integración vertical de la cadena de valor, asegurando que su empresa no solo llegue al puerto, sino que conquiste el mercado.
                                </p>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 size={16} className="text-emerald-400" /> Foco en Rentabilidad Real
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 size={16} className="text-emerald-400" /> Mitigación de Riesgos Cambiarios
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 size={16} className="text-emerald-400" /> Cumplimiento Normativo Preventivo
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Professional Services Section (CTA) */}
                <div className="mt-20 pt-12 border-t border-white/10">
                    <GlassPanel className="p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-900/20 border-emerald-500/20 border-t-4 border-t-emerald-500 hover:shadow-emerald-500/10 transition-shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Proyectá tu Empresa al Mundo</h2>
                                <p className="text-slate-400 leading-relaxed mb-8">
                                    En <span className="text-white font-bold tracking-widest">RAMUX</span> transformamos pymes locales en actores globales. Solicitá hoy una auditoría de exportabilidad o una consultoría de inteligencia de mercados para tu próximo destino.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-emerald-400" /> Auditoría de Expansión
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-emerald-400" /> Ingeniería de Precios EXW/FOB
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-emerald-400" /> Búsqueda de Mercados Meta
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-emerald-400" /> Soporte en Negociación
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center md:items-end text-center md:text-right">
                                <div className="space-y-1 mb-8">
                                    <p className="text-2xl font-black text-white tracking-tight">Fernando Silguero Ramirez</p>
                                    <p className="text-emerald-400 font-mono text-sm uppercase tracking-widest leading-none">Ceo & Founder Ramux</p>
                                    <p className="text-slate-500 text-xs italic">Gestión de Negocios Internacionales - FCEco - UNER</p>
                                </div>
                                <a 
                                    href="https://wa.me/message/WATOKPKLCBMPK1"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-8 py-3 bg-white text-slate-950 font-black rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl hover:shadow-emerald-500/20 flex items-center gap-2 group mb-3 outline-none"
                                >
                                    Solicitar Auditoría <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a 
                                    href="mailto:Holaramux@gmail.com"
                                    className="text-slate-400 font-mono text-xs hover:text-sky-400 transition-colors flex items-center gap-2"
                                >
                                    Holaramux@gmail.com
                                </a>
                            </div>
                        </div>
                    </GlassPanel>
                </div>
            </div>
        </Layout>
    );
};

export default ExpansionGlobal;
