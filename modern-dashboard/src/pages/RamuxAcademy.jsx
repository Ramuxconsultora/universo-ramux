import React, { useLayoutEffect, useState } from 'react';
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
    Home,
    Send,
    MessageSquare,
    ChevronDown
} from 'lucide-react';

const CourseInquiryForm = ({ courses }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Consulta Academia: ${formData.course}`);
        const body = encodeURIComponent(
            `Hola Ramux,\n\nMi nombre es ${formData.name}.\nMe interesa el curso: ${formData.course}\n\nMensaje:\n${formData.message}\n\nContacto: ${formData.email}`
        );
        window.location.href = `mailto:holaramux@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <NeumorphicPanel 
            radiance="ramux" 
            className="w-full xl:w-[450px] p-8 relative overflow-hidden group/form flex flex-col"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F76B1C]/5 rounded-full blur-[20px] pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#F76B1C]/10 rounded-lg border border-[#F76B1C]/20">
                        <MessageSquare size={18} className="text-[#F76B1C]" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-wider">Consultoría Académica</h3>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Resolvé tus dudas</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Tu nombre"
                                className="w-full bg-[#0a0e1a]/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#F76B1C]/50 transition-colors shadow-inner"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
                            <input 
                                required
                                type="email" 
                                placeholder="tu@correo.com"
                                className="w-full bg-[#0a0e1a]/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 transition-colors shadow-inner"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 relative">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Cursos Disponibles</label>
                        <div className="relative group/select">
                            <select 
                                required
                                className="w-full bg-[#0a0e1a]/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#F76B1C]/50 transition-colors shadow-inner cursor-pointer"
                                onChange={(e) => setFormData({...formData, course: e.target.value})}
                            >
                                <option value="" disabled selected>Seleccioná un curso</option>
                                {courses.map((c, i) => (
                                    <optgroup key={i} label={c.category} className="bg-[#12161f] text-slate-400 uppercase text-[10px] tracking-widest font-black py-2">
                                        {c.items.map((item, j) => (
                                            <option key={j} value={item} className="bg-[#0a0e1a] text-sm text-white capitalize py-2 italic font-normal">{item}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-hover/select:text-white transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Tu consulta</label>
                        <textarea 
                            required
                            rows="2"
                            placeholder="¿En qué podemos ayudarte?"
                            className="w-full bg-[#0a0e1a]/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#F76B1C]/50 transition-colors shadow-inner resize-none"
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-[#F76B1C] hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest group/btn"
                    >
                        Enviar Consulta <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </form>
            </div>
        </NeumorphicPanel>
    );
};

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

                {/* Hero / Welcome Panel + Inquiry Form */}
                <div className="flex flex-col xl:flex-row gap-6 items-stretch">
                    <NeumorphicPanel 
                        radiance="ramux"
                        className="flex-grow p-8 md:p-12 relative overflow-hidden group/hero min-h-[300px]"
                    >
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[40px] pointer-events-none group-hover/hero:bg-[#F76B1C]/15 transition-all duration-1000" />
                        
                        <div className="relative z-10 flex flex-col justify-center h-full space-y-6">
                            <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 w-fit">
                                <GraduationCap size={16} className="text-[#F76B1C]" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Knowledge Hub</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase max-w-4xl">
                                Ramux <span className="text-[#F76B1C]">Academy</span>
                            </h1>
                            
                            <p className="text-lg text-slate-300 max-w-xl leading-relaxed font-medium">
                                Transformando el conocimiento estratégico en capacidad operativa de alto impacto mediante formación técnica y mentoría especializada.
                            </p>
                        </div>
                    </NeumorphicPanel>

                    <CourseInquiryForm courses={[
                        { category: "LEGAL", items: legalModules.map(m => m.title) },
                        { category: "GLOBAL", items: globalModules.map(m => m.title) },
                        { category: "WEALTH", items: wealthModules.map(m => m.title) },
                        { category: "IA", items: aiModules.map(m => m.title) },
                        { category: "LEADERSHIP", items: leadershipModules.map(m => m.title) }
                    ]} />
                </div>

                {/* ACADEMIC WIDGETS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    
                    {/* Legal Academy Widget */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-4 bg-[#12161f]/80 p-4 rounded-2xl border border-white/5">
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
                        <div className="flex items-center gap-4 bg-[#12161f]/80 p-4 rounded-2xl border border-white/5">
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
                        <div className="flex items-center gap-4 bg-[#12161f]/80 p-4 rounded-2xl border border-white/5 relative group">
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
                        <div className="flex items-center gap-4 bg-[#12161f]/80 p-4 rounded-2xl border border-white/5">
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
                        <div className="flex items-center gap-4 bg-[#12161f]/80 p-4 rounded-2xl border border-white/5">
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
