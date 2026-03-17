import React from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react';

const EducationWidget = ({ progressData = [] }) => {
    // 1. Calculate overall or representative progress
    // For now, let's show the highest progress or just the first one if it exists
    const sortedProgress = [...progressData].sort((a, b) => b.progress - a.progress);
    const mainCourse = sortedProgress[0] || { course_title: 'Sin Cursos Activos', progress: 0, last_lesson: 'Comienza tu formación' };
    const progress = mainCourse.progress;

    return (
        <NeumorphicPanel className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <GraduationCap size={18} className="text-[#F76B1C]" />
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Progreso_Académico</h4>
                </div>
                <span className="text-[10px] font-black text-[#F76B1C] italic">{progress}%</span>
            </div>

            <div className="flex-grow space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div 
                            className="h-full bg-gradient-to-r from-[#F76B1C] to-orange-400 transition-all duration-1000"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                        <span>Principiante</span>
                        <span>Experto</span>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="space-y-3">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Siguiente_Lección</p>
                    <div className="group cursor-pointer p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#F76B1C]/30 transition-all">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                    <CheckCircle2 size={12} className="text-[#F76B1C]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white uppercase tracking-tight italic">{mainCourse.course_title}</p>
                                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{mainCourse.last_lesson || 'Módulo Pendiente'}</p>
                                </div>
                            </div>
                            <ChevronRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </div>

            <button className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 text-white font-black text-[9px] uppercase tracking-[0.3em] rounded-xl border border-white/5 transition-all active:scale-95">
                Continuar_Aprendizaje
            </button>
        </NeumorphicPanel>
    );
};

export default EducationWidget;
