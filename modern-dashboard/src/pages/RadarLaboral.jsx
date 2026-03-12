import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import GlassPanel from '../components/ui/GlassPanel';
import LaborLawCalculator from '../components/widgets/LaborLawCalculator';
import { Scale, Building2, UserCircle, Search, FileText, ArrowRight } from 'lucide-react';

const RadarLaboral = () => {
    // true = Employer Mode, false = Worker Mode
    const [isEmployerMode, setIsEmployerMode] = useState(true);

    const themeColors = isEmployerMode
        ? {
            bg: 'bg-slate-950',
            primary: 'sky-500',
            primaryText: 'text-sky-400',
            primaryBorder: 'border-sky-500/30',
            primaryBg: 'bg-sky-500/10',
            accent: 'text-amber-400',
            titleText: 'Compliance & LegalTech',
            description: 'Gestión de riesgo corporativo y análisis normativo avanzado.'
        }
        : {
            bg: 'bg-[#021f15]',
            primary: 'emerald-500',
            primaryText: 'text-emerald-400',
            primaryBorder: 'border-emerald-500/30',
            primaryBg: 'bg-emerald-500/10',
            accent: 'text-white',
            titleText: 'Mis Derechos Laborales',
            description: 'Conoce tus derechos, plazos y cálculos bajo la nueva ley.'
        };

    return (
        <Layout>
            <div className={`space-y-8 animate-fade-in transition-colors duration-500`}>

                {/* Header & Toggle */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${themeColors.primaryBg} border ${themeColors.primaryBorder} shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]`}>
                            <Scale className={themeColors.primaryText} size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Dashboard Normativo</h1>
                            <p className={`${themeColors.primaryText} font-mono mt-1 text-sm tracking-wide`}>{themeColors.titleText}</p>
                        </div>
                    </div>

                    {/* Default Tailwind Switch Simulation */}
                    <div className="flex items-center bg-[#0a0f1c] p-1.5 rounded-full border border-sky-900/40 shadow-xl overflow-hidden">
                        <button
                            onClick={() => setIsEmployerMode(true)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 relative ${isEmployerMode ? 'bg-sky-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.5)] z-10' : 'text-slate-500 hover:text-white z-0'}`}
                        >
                            <Building2 size={16} /> <span className="hidden sm:inline">Modo</span> Empleador
                        </button>
                        <button
                            onClick={() => setIsEmployerMode(false)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 relative ${!isEmployerMode ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] z-10' : 'text-slate-500 hover:text-white z-0'}`}
                        >
                            <UserCircle size={16} /> <span className="hidden sm:inline">Modo</span> Trabajador
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column (8 cols) */}
                    <div className="lg:col-span-8 flex flex-col gap-8">

                        {/* NLP Search Simulator */}
                        <GlassPanel className={`p-6 border ${themeColors.primaryBorder} relative overflow-hidden group shadow-lg`}>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                                <Search className={themeColors.primaryText} size={20} />
                                Buscador Semántico Legal (Ley 27.802 y DNU 70)
                            </h3>
                            <div className="relative z-10">
                                <input
                                    type="text"
                                    placeholder={isEmployerMode ? "Ej: 'Implementar banco de horas', 'Calcular despido Pyme'..." : "Ej: 'Cuántos meses de prueba tengo', 'Fondo de cese'..."}
                                    className="w-full bg-[#050914]/80 border border-slate-700/80 text-white rounded-xl py-4 pl-12 pr-32 focus:outline-none focus:border-white/30 transition-colors shadow-inner"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <button className={`absolute right-2 top-1/2 -translate-y-1/2 bg-${isEmployerMode ? 'sky' : 'emerald'}-600 hover:bg-${isEmployerMode ? 'sky' : 'emerald'}-500 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-white/10`}>
                                    Consultar IA
                                </button>
                            </div>
                        </GlassPanel>

                        {/* Labor Law Calculator */}
                        <div className="relative z-10 mt-4">
                            <h2 className={`text-xl font-bold ${isEmployerMode ? 'text-sky-300' : 'text-emerald-300'} mb-4 flex items-center gap-2`}>
                                <FileText size={20} />
                                Herramienta Predictiva y Cálculo de Liquidaciones
                            </h2>
                            <LaborLawCalculator />
                        </div>
                    </div>

                    {/* Right Column (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-8">

                        {/* Time-Machine Card (Antes vs Ahora) */}
                        <div className="relative h-[280px] group cursor-pointer [perspective:1000px]">
                            <div className="w-full h-full absolute transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front (Old Law) */}
                                <GlassPanel className="absolute w-full h-full [backface-visibility:hidden] p-8 border-slate-700 flex flex-col justify-center bg-slate-900 filter grayscale">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Régimen Histórico</div>
                                    <h3 className="text-2xl font-bold text-slate-300 mb-2 font-orbitron">LCT 20.744</h3>
                                    <p className="text-slate-400 text-sm">
                                        Período de prueba General:<br />
                                        <span className="text-3xl text-white font-mono mt-2 block">3 Meses</span>
                                    </p>
                                    <div className="mt-auto flex items-center text-xs text-slate-500 gap-2 justify-center pt-6 border-t border-slate-800">
                                        Pasa el cursor para ver el nuevo régimen <ArrowRight size={14} className="animate-pulse" />
                                    </div>
                                </GlassPanel>

                                {/* Back (New Law) */}
                                <GlassPanel className={`absolute w-full h-full [backface-visibility:hidden] p-8 border-${isEmployerMode ? 'sky' : 'emerald'}-500 flex flex-col justify-center bg-[#0a1526] [transform:rotateY(180deg)] shadow-[0_0_40px_rgba(${isEmployerMode ? '14,165,233' : '16,185,129'},0.25)]`}>
                                    <div className={`text-xs font-bold ${themeColors.primaryText} uppercase tracking-widest mb-2`}>Marzo 2026</div>
                                    <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">Ley 27.802</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        Período de prueba Pymes:<br />
                                        <span className={`text-4xl ${themeColors.primaryText} font-mono mt-2 block font-black drop-shadow-[0_0_15px_inherit]`}>8 Meses</span>
                                    </p>
                                    <div className="mt-auto bg-slate-900/50 p-2 rounded border border-slate-700/50">
                                        <p className="text-xs text-slate-400 text-center">Microempresas: hasta <strong>1 Año</strong> s/CCT.</p>
                                    </div>
                                </GlassPanel>
                            </div>
                        </div>

                        {/* Quick Action Tiles */}
                        <GlassPanel className={`p-6 border ${themeColors.primaryBorder}`}>
                            <h3 className="text-lg font-bold text-white mb-4">
                                {isEmployerMode ? "Acciones Frecuentes RRHH" : "Mis Consultas Rápidas"}
                            </h3>
                            <div className="space-y-3">
                                <button className={`w-full text-left p-4 rounded-xl bg-[#080c17] hover:bg-[#0c1426] border border-white/5 hover:border-${themeColors.primary.split('-')[0]}-500/50 transition-all duration-300 flex items-center gap-3 group`}>
                                    <div className={`p-2 rounded-lg bg-${themeColors.primary.split('-')[0]}-500/10 group-hover:bg-${themeColors.primary.split('-')[0]}-500/20 transition-colors`}>
                                        <FileText size={18} className={themeColors.primaryText} />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">
                                        {isEmployerMode ? "Acta Acuerdo: Banco de Horas" : "Simulador: Salario Neto + Ganancias"}
                                    </span>
                                </button>
                                <button className={`w-full text-left p-4 rounded-xl bg-[#080c17] hover:bg-[#0c1426] border border-white/5 hover:border-${themeColors.primary.split('-')[0]}-500/50 transition-all duration-300 flex items-center gap-3 group`}>
                                    <div className={`p-2 rounded-lg bg-${themeColors.primary.split('-')[0]}-500/10 group-hover:bg-${themeColors.primary.split('-')[0]}-500/20 transition-colors`}>
                                        <FileText size={18} className={themeColors.primaryText} />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">
                                        {isEmployerMode ? "Adhesión al Fondo de Cese (FAL)" : "Calculadora Base de Vacaciones"}
                                    </span>
                                </button>
                                <button className={`w-full text-left p-4 rounded-xl bg-[#080c17] hover:bg-[#0c1426] border border-white/5 hover:border-${themeColors.primary.split('-')[0]}-500/50 transition-all duration-300 flex items-center gap-3 group`}>
                                    <div className={`p-2 rounded-lg bg-${themeColors.primary.split('-')[0]}-500/10 group-hover:bg-${themeColors.primary.split('-')[0]}-500/20 transition-colors`}>
                                        <FileText size={18} className={themeColors.primaryText} />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">
                                        {isEmployerMode ? "Contrato Colaborador Independiente" : "Contrato Colaborador Independiente"}
                                    </span>
                                </button>
                            </div>
                        </GlassPanel>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RadarLaboral;
