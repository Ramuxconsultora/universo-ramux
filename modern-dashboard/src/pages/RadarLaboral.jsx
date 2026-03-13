import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import GlassPanel from '../components/ui/GlassPanel';
import LaborLawCalculator from '../components/widgets/LaborLawCalculator';
import { 
    Scale, Building2, UserCircle, Search, FileText, 
    ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, 
    Briefcase, Landmark, Info, ChevronDown, ChevronUp, Users,
    ArrowLeft, Home
} from 'lucide-react';

const AccordionItem = ({ title, children, isOpen, onToggle, icon: Icon, iconColor }) => (
    <div className="border border-white/5 rounded-2xl overflow-hidden bg-slate-900/20 mb-4 transition-all duration-300">
        <button 
            onClick={onToggle}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
        >
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-white/5 ${iconColor}`}>
                    <Icon size={20} />
                </div>
                <span className="font-bold text-slate-200">{title}</span>
            </div>
            {isOpen ? <ChevronUp size={20} className="text-slate-500" /> : <ChevronDown size={20} className="text-slate-500" />}
        </button>
        <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                {children}
            </div>
        </div>
    </div>
);

const RadarLaboral = () => {
    const navigate = useNavigate();
    const [activePerspective, setActivePerspective] = useState('employer'); // 'employer' or 'employee'
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (id) => setOpenAccordion(openAccordion === id ? null : id);

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
                        <div className="w-20 h-20 rounded-3xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.15)]">
                            <Scale className="text-sky-400" size={40} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tight">Radar Laboral</h1>
                            <p className="text-sky-400/80 font-mono text-sm mt-1 uppercase tracking-widest">Inteligencia Normativa & LegalTech</p>
                        </div>
                    </div>

                    {/* Perspective Selector (Tabs) */}
                    <div className="flex p-1.5 bg-slate-900/80 rounded-2xl border border-white/10 shadow-2xl relative">
                        <button 
                            onClick={() => setActivePerspective('employer')}
                            className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-500 z-10 ${activePerspective === 'employer' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Building2 size={18} /> Perspectiva Empleador
                        </button>
                        <button 
                            onClick={() => setActivePerspective('employee')}
                            className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-500 z-10 ${activePerspective === 'employee' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <UserCircle size={18} /> Perspectiva Empleado
                        </button>
                    </div>
                </div>

                {/* Perspective Viewport */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                {/* Main Content Area */}
                <div className="lg:col-span-12 space-y-8">
                        
                        {activePerspective === 'employer' ? (
                            <div className="space-y-6 animate-fade-in">
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <ShieldCheck className="text-sky-400" size={24} />
                                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Obligaciones & Buenas Prácticas</h2>
                                    </div>
                                    
                                    <AccordionItem 
                                        title="Registro Laboral (Alta Temprana y Simplificación)" 
                                        isOpen={openAccordion === 'emp1'} 
                                        onToggle={() => toggleAccordion('emp1')}
                                        icon={Landmark}
                                        iconColor="text-sky-400"
                                    >
                                        <p className="mb-4">El cumplimiento inicia con la **Simplificación Registral (AFIP)**. Es imperativo tramitar el **Alta Temprana** antes del inicio efectivo de la prestación de tareas (Art. 18, Ley 24.013).</p>
                                        <ul className="space-y-2 list-disc pl-4 text-slate-300">
                                            <li><span className="font-bold text-white">Libro de Sueldos Digital:</span> Obligatoriedad de registro de novedades mensuales sincronizado con AFIP.</li>
                                            <li><span className="font-bold text-white">Declaración en Formulario 931:</span> El pilar de la recaudación previsional y de seguridad social.</li>
                                            <li><span className="font-bold text-white">Multas por Deficiencia:</span> La falta de registro acarrea sanciones agravadas (Leyes 24.013 y 25.323).</li>
                                        </ul>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="LCT 20.744 y Marco General" 
                                        isOpen={openAccordion === 'emp2'} 
                                        onToggle={() => toggleAccordion('emp2')}
                                        icon={FileText}
                                        iconColor="text-sky-400"
                                    >
                                        <p className="mb-4">Como empleador, la Ley de Contrato de Trabajo rige el 95% de la relación. Los principios de **Buena Fe** y **Continuidad** son rectores.</p>
                                        <p className="text-slate-300 bg-white/5 p-4 rounded-lg border-l-4 border-sky-500">
                                            <Info size={16} className="inline mr-2 text-sky-400" />
                                            Recordar: El contrato se presume de tiempo indeterminado, salvo prueba en contrario y cumplimiento de requisitos específicos para modalidades eventuales o de plazo fijo.
                                        </p>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="Cobertura de Riesgos (ART) y Seguro de Vida" 
                                        isOpen={openAccordion === 'emp3'} 
                                        onToggle={() => toggleAccordion('emp3')}
                                        icon={ShieldCheck}
                                        iconColor="text-sky-400"
                                    >
                                        <p className="mb-4">La **Ley de Riesgos del Trabajo (24.557)** es un sistema de responsabilidad objetiva. El empleador DEBE:</p>
                                        <ol className="space-y-2 list-decimal pl-4 text-slate-300">
                                            <li>Ailiarse a una Aseguradora de Riesgos del Trabajo (ART).</li>
                                            <li>Abonar el Seguro de Vida Obligatorio (SCVO) - Decreto 1567/74.</li>
                                            <li>Cumplir con normas de Higiene y Seguridad para mitigar la tasa de siniestralidad.</li>
                                        </ol>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="Incentivos MiPyME y Cargas Sociales" 
                                        isOpen={openAccordion === 'emp4'} 
                                        onToggle={() => toggleAccordion('emp4')}
                                        icon={Briefcase}
                                        iconColor="text-sky-400"
                                    >
                                        <p>En el marco de la **Ley 27.802**, existen reducciones de contribuciones para empleadores que incrementen su planta de personal. La categorización MiPyME en la Secretaría de Industria es vital para acceder a créditos fiscales y regímenes simplificados.</p>
                                    </AccordionItem>
                                </section>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fade-in">
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <CheckCircle2 className="text-emerald-400" size={24} />
                                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Derechos & Herramientas</h2>
                                    </div>
                                    
                                    <AccordionItem 
                                        title="Derechos Irrenunciables (Art. 12 LCT)" 
                                        isOpen={openAccordion === 'enp1'} 
                                        onToggle={() => toggleAccordion('enp1')}
                                        icon={Scale}
                                        iconColor="text-emerald-400"
                                    >
                                        <p className="mb-4">El principio de **Irrenunciabilidad** establece que es nula toda convención que disminuya los derechos del trabajador.</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                                <h4 className="font-bold text-white text-xs uppercase mb-2">Jornada Legal</h4>
                                                <p>Máximo 48hs semanales. Excedentes se abonan con recargo (50% o 100%).</p>
                                            </div>
                                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                                <h4 className="font-bold text-white text-xs uppercase mb-2">SAC (Aguinaldo)</h4>
                                                <p>Pago anual en dos cuotas: Junio y Diciembre. 50% de la mayor remuneración.</p>
                                            </div>
                                        </div>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="Interpretación de Recibo de Sueldo" 
                                        isOpen={openAccordion === 'enp2'} 
                                        onToggle={() => toggleAccordion('enp2')}
                                        icon={Landmark}
                                        iconColor="text-emerald-400"
                                    >
                                        <p className="mb-4 text-slate-300">Es crucial distinguir la naturaleza de los rubros:</p>
                                        <ul className="space-y-3">
                                            <li className="flex gap-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></span>
                                                <div>
                                                    <span className="font-bold text-blue-400">Conceptos Remunerativos:</span> 
                                                    Sujetos a retenciones previsionales (Jubilación, Obra Social). Base de cálculo para SAC e indemnizaciones.
                                                </div>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5"></span>
                                                <div>
                                                    <span className="font-bold text-amber-400">Conceptos No Remunerativos:</span> 
                                                    No sufren deducciones comunes. Ej: Asignaciones familiares, Beneficios sociales (Ticket canasta).
                                                </div>
                                            </li>
                                        </ul>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="Convenios Colectivos (CCT)" 
                                        isOpen={openAccordion === 'enp3'} 
                                        onToggle={() => toggleAccordion('enp3')}
                                        icon={Users}
                                        iconColor="text-emerald-400"
                                    >
                                        <p>Los CCT (Ej: Comercio 130/75, UOCRA, Sanidad) mejoran el piso de la LCT. Definen las escalas salariales vigentes para tu categoría profesional y establecen licencias adicionales por estudio, fallecimiento o nacimiento.</p>
                                    </AccordionItem>

                                    <AccordionItem 
                                        title="Trabajo No Registrado (Acciones)" 
                                        isOpen={openAccordion === 'enp4'} 
                                        onToggle={() => toggleAccordion('enp4')}
                                        icon={AlertTriangle}
                                        iconColor="text-red-400"
                                    >
                                        <p className="mb-4">Ante el trabajo "en negro" o deficiente (fecha de ingreso post-datada o salario inferior al real), el trabajador tiene derecho a la regularización mediante **intimación fehaciente (Telegrama Ley 23.789)**.</p>
                                        <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-red-200 text-xs">
                                            <strong>NOTA CRÍTICA:</strong> El envío del telegrama laboral es GRATUITO para el trabajador garantizando el principio de gratuidad (Art. 20 LCT).
                                        </div>
                                    </AccordionItem>
                                </section>
                            </div>
                        )}

                    {/* Labor Law Calculator Integration Integration */}
                    <div className="pt-10 border-t border-white/5">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Landmark className="text-sky-400" size={20} />
                            Simulador de Liquidaciones Predictivo
                        </h3>
                        <LaborLawCalculator />
                    </div>
                </div>
                </div>

                {/* Professional Services Section */}
                <div className="mt-20 pt-12 border-t border-white/10">
                    <GlassPanel className="p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900/20 border-sky-500/20 border-t-4 border-t-sky-500 hover:shadow-sky-500/10 transition-shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Potenciá tu Gestión de Capital Humano</h2>
                                <p className="text-slate-400 leading-relaxed mb-8">
                                    En <span className="text-white font-bold tracking-widest">RAMUX</span> integramos el rigor normativo con la agilidad tecnológica de la nueva era. Elevamos los estándares de tu organización mediante soluciones personalizadas y estratégicas.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-sky-400" /> Gestión de RRHH 360°
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-sky-400" /> Selección & Headhunting
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-sky-400" /> Liquidación de Sueldos
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-sky-400" /> Auditoría de Indemnizaciones
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center md:items-end text-center md:text-right">
                                <div className="space-y-1 mb-8">
                                    <p className="text-2xl font-black text-white tracking-tight">Fernando Silguero Ramirez</p>
                                    <p className="text-sky-400 font-mono text-sm uppercase tracking-widest leading-none">Ceo & Founder Ramux</p>
                                    <p className="text-slate-500 text-xs italic">Profesional en RRHH - FCEco - UNER</p>
                                </div>
                                <a 
                                    href="https://wa.me/message/WATOKPKLCBMPK1"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-8 py-3 bg-white text-slate-950 font-black rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl hover:shadow-emerald-500/20 flex items-center gap-2 group mb-3 outline-none"
                                >
                                    Solicitar Consultoria <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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

export default RadarLaboral;
