import React from 'react';
import { BookOpen, GraduationCap, Download, CheckCircle2, ChevronRight } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';

const ProgressSection = ({ courses = [] }) => {
    const currentCourses = courses;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Mis Cursos - Main List */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-3 px-4">
                    <BookOpen size={20} className="text-sky-400" />
                    <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Formación en Curso</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentCourses.map((course) => (
                        <GlassPanel key={course.id} className="p-6 group/course hover:border-sky-500/30 transition-all">
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h5 className="text-[11px] font-black text-white uppercase leading-tight max-w-[150px]">
                                        {course.title}
                                    </h5>
                                    {course.status === 'completed' ? (
                                        <CheckCircle2 size={16} className="text-emerald-400" />
                                    ) : (
                                        <span className="text-[9px] font-black text-sky-400 uppercase tracking-widest">{course.progress}%</span>
                                    )}
                                </div>
                                
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-1000 ease-out rounded-full ${course.status === 'completed' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]'}`}
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                
                                <button className="w-full flex items-center justify-between text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors group">
                                    {course.status === 'completed' ? 'Ver Certificado' : 'Continuar Lección'}
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </GlassPanel>
                    ))}
                </div>
            </div>

            {/* Certificados & Hitos Sidebar */}
            <GlassPanel className="p-8 border-l-2 border-emerald-500/40">
                <div className="flex items-center gap-3 mb-8">
                    <GraduationCap size={20} className="text-emerald-400" />
                    <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Certificados</h4>
                </div>

                <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/20">
                                <Download size={16} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white uppercase tracking-tight">Especialista en RRHH</p>
                                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Emitido: 12 Feb 2026</p>
                            </div>
                        </div>
                        <button className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-black py-2.5 rounded-xl text-[9px] uppercase tracking-widest transition-all">
                            Descargar PDF
                        </button>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Próximo Hito</p>
                        <div className="flex items-center gap-3 grayscale opacity-40">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <GraduationCap size={20} className="text-slate-400" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Analista Senior</p>
                        </div>
                    </div>
                </div>
            </GlassPanel>
        </div>
    );
};

export default ProgressSection;
