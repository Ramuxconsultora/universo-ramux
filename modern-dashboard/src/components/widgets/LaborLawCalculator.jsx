import React, { useState } from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { Scale, Calculator, AlertCircle, Info, Building2, Calendar, DollarSign, ArrowRight, ShieldCheck, Copy, Check, TrendingDown } from 'lucide-react';

export default function LaborLawCalculator() {
    const [inputs, setInputs] = useState({
        fechaIngreso: '',
        fechaDespido: '',
        mrmnh: '',
        topeConvenio: '',
        tipoEmpresa: 'MiPyME'
    });

    const [results, setResults] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const calculate = () => {
        if (!inputs.fechaIngreso || !inputs.fechaDespido || !inputs.mrmnh) {
            alert('Por favor complete al menos las fechas y la MRMNH.');
            return;
        }

        const ingreso = new Date(inputs.fechaIngreso + 'T00:00:00');
        const despido = new Date(inputs.fechaDespido + 'T00:00:00');

        if (isNaN(ingreso.getTime()) || isNaN(despido.getTime()) || despido <= ingreso) {
            alert('Por favor indique fechas válidas. El despido debe ser posterior al ingreso.');
            return;
        }

        const mrmnhRaw = parseFloat(inputs.mrmnh) || 0;
        const topeOriginal = parseFloat(inputs.topeConvenio);
        const tope = isNaN(topeOriginal) || inputs.topeConvenio === '' ? Infinity : topeOriginal;

        // --- 0. Cálculos de Base y SAC Proporcional Final ---
        // SAC Proporcional del semestre en curso
        const anioDespido = despido.getFullYear();
        const mesDespido = despido.getMonth(); // 0-11
        // Determinar inicio del semestre activo
        let inicioSemestre;
        if (mesDespido < 6) {
            inicioSemestre = new Date(anioDespido, 0, 1); // 1 de enero
        } else {
            inicioSemestre = new Date(anioDespido, 6, 1); // 1 de julio
        }

        // Si ingresó en medio del semestre, el inicio es la fecha de ingreso
        const fechaInicioCalculoSac = ingreso > inicioSemestre ? ingreso : inicioSemestre;

        // Días trabajados en el semestre
        const diffDiasSemestre = Math.max(0, despido - fechaInicioCalculoSac);
        const diasTrabajadosSemestre = Math.ceil(diffDiasSemestre / (1000 * 60 * 60 * 24));

        // Fórmula SAC Proporcional semestre = (Sueldo / 365) * diasTrabajados (El usuario indica usar Divisor 365)
        const sacProporcionalLiquidacion = (mrmnhRaw / 365) * diasTrabajadosSemestre;

        // Antigüedad general
        const diffTime = despido - ingreso;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths = diffDays / 30.4167; // Promedio de días por mes
        const fullYears = Math.floor(diffMonths / 12);
        const remainingMonths = diffMonths % 12;
        const aniosAntiguedad = fullYears + (remainingMonths > 3 ? 1 : 0);

        // --- 0.1 Vacaciones Proporcionales (Art. 150/155 LCT) ---
        // Determinar días de vacaciones por ley (según antigüedad base)
        let diasVacacionesLey = 14;
        if (fullYears >= 20) diasVacacionesLey = 35;
        else if (fullYears >= 10) diasVacacionesLey = 28;
        else if (fullYears >= 5) diasVacacionesLey = 21;

        // Proporcionales: (Días de Ley / 365) * Días trabajados en el año de cese
        const inicioAnioCese = new Date(anioDespido, 0, 1);
        const ceseOInicioAnio = ingreso > inicioAnioCese ? ingreso : inicioAnioCese;
        const diasTrabajadosAnio = Math.max(0, Math.ceil((despido - ceseOInicioAnio) / (1000 * 60 * 60 * 24)));
        const diasVacacionesProporcionales = (diasVacacionesLey / 365) * diasTrabajadosAnio;

        // Valor Vacaciones Proporcionales (Sueldo / 25 * días prop)
        const valorVacacionesProp = (mrmnhRaw / 25) * diasVacacionesProporcionales;
        // SAC sobre Vacaciones (aplica en ambos regímenes, usando 8.33% exacto)
        const sacVacaciones = valorVacacionesProp * 0.0833;

        // --- 1. Régimen Anterior (LCT 20.744) ---
        // LCT: La base suma la incidencia mensual del SAC (8.33% estricto)
        const mrmnhLCT = mrmnhRaw + (mrmnhRaw * 0.0833);

        const topeVizzotiLCT = tope === Infinity ? mrmnhLCT : tope;
        // La base no puede ser reducida por el tope a menos del 67% del MRMNH real (Vizzoti)
        const baseLCT = Math.max(mrmnhLCT * 0.67, Math.min(mrmnhLCT, topeVizzotiLCT));

        let indemnizacionAntiguedadLCT = 0;
        if (aniosAntiguedad > 0) {
            indemnizacionAntiguedadLCT = Math.max(baseLCT * aniosAntiguedad, mrmnhLCT); // Piso de 1 mes 
        }

        // Plazos de Preaviso (Art. 231 LCT)
        let mesesPreaviso = 1; // > 3 meses a 5 años
        if (diffMonths <= 3) mesesPreaviso = 0.5; // Período de prueba (15 días)
        else if (diffMonths > 60) mesesPreaviso = 2; // > 5 años (Dato estricto: 2 MESES = 60 DÍAS, sin reducción)

        // LCT: El preaviso incluye SAC desde la base mrmnhLCT
        const preavisoLCT = mrmnhLCT * mesesPreaviso;

        const diasDelMes = new Date(despido.getFullYear(), despido.getMonth() + 1, 0).getDate();
        const diasTrabajados = despido.getDate();
        const diasRestantes = Math.max(0, diasDelMes - diasTrabajados);

        // LCT: Integración incluye SAC desde la base mrmnhLCT
        let integracionLCT = 0;
        if (diasRestantes > 0 && diasTrabajados < diasDelMes) {
            integracionLCT = (mrmnhLCT / diasDelMes) * diasRestantes;
        }

        // Total LCT sumando todo incl. Liquidación Final
        const totalLCT = indemnizacionAntiguedadLCT + preavisoLCT + integracionLCT + sacProporcionalLiquidacion + valorVacacionesProp + sacVacaciones;

        // --- 2. Nuevo Régimen (Ley 27.802) ---
        // Nueva Ley: Mantiene la base limpia de SAC
        const mrmnhNuevaBase = mrmnhRaw;

        // La protección constitucional de Vizzoti (piso 67%) aplica sobre la base (sin SAC) de la Nueva Ley
        const topeVizzotiNueva = tope === Infinity ? mrmnhNuevaBase : tope;
        const baseNueva = Math.max(mrmnhNuevaBase * 0.67, Math.min(mrmnhNuevaBase, topeVizzotiNueva));

        let indemnizacionAntiguedadNueva = 0;
        if (aniosAntiguedad > 0) {
            indemnizacionAntiguedadNueva = baseNueva * aniosAntiguedad; // Ya está topada según Vizzoti Nueva o Legal
        }

        // Nueva Ley no tiene incidencia de SAC
        const preavisoNueva = mrmnhNuevaBase * mesesPreaviso;

        let integracionNueva = 0;
        if (diasRestantes > 0 && diasTrabajados < diasDelMes) {
            integracionNueva = (mrmnhNuevaBase / diasDelMes) * diasRestantes;
        }

        const sacNueva = 0; // Sin incidencia de SAC sobre indemnizaciones en 27.802

        const totalNueva = indemnizacionAntiguedadNueva + preavisoNueva + integracionNueva + sacNueva + sacProporcionalLiquidacion + valorVacacionesProp + sacVacaciones;

        // Validaciones fecha para Fondo Asistencia
        const fechaFAL = new Date('2026-06-01T00:00:00');
        const isPostFAL = despido > fechaFAL;

        setResults({
            aniosAntiguedad,
            mesesPreaviso,
            isPostFAL,
            baseLCT,
            baseNueva,
            sacProporcionalLiquidacion,
            valorVacacionesProp,
            sacVacaciones,
            lct: {
                antiguedad: indemnizacionAntiguedadLCT,
                preaviso: preavisoLCT,
                integracion: integracionLCT,
                total: totalLCT
            },
            nueva: {
                antiguedad: indemnizacionAntiguedadNueva,
                preaviso: preavisoNueva,
                integracion: integracionNueva,
                total: totalNueva
            }
        });
    };

    const formatCurrency = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);
    const getDiff = (ant, nue) => nue - ant;
    const getDiffPct = (ant, nue) => {
        if (ant === 0 && nue === 0) return 0;
        if (ant === 0) return 100;
        return ((nue - ant) / ant) * 100;
    };

    const generateReportText = () => {
        if (!results) return '';

        let report = `------------------------------------------------------------------\n`;
        report += `RAMUX - INFORME TÉCNICO COMPARATIVO: LEY 27.802 vs LCT 20.744\n`;
        report += `------------------------------------------------------------------\n\n`;

        report += `1. DATOS DEL CASO\n`;
        report += `------------------------------------------------------------------\n`;
        report += `- Fecha de Ingreso   : ${inputs.fechaIngreso}\n`;
        report += `- Fecha de Egreso    : ${inputs.fechaDespido}\n`;
        report += `- Antigüedad Legal   : ${results.aniosAntiguedad} año(s)\n`;
        report += `- Remuneración MRMNH : ${formatCurrency(inputs.mrmnh)} (Sin SAC)\n`;
        report += `- Tope de Convenio   : ${inputs.topeConvenio ? formatCurrency(inputs.topeConvenio) : 'No especificado'}\n`;
        report += `- Tipo de Empresa    : ${inputs.tipoEmpresa}\n\n`;

        report += `2. AUDITORÍA DE BASES Y TOPES DE CÁLCULO\n`;
        report += `------------------------------------------------------------------\n`;
        report += `>> LEY 20.744 (Régimen Anterior)\n`;
        report += `- Base Remunerativa (MRMNH + SAC 8.33%)   : ${formatCurrency((parseFloat(inputs.mrmnh) || 0) * 1.0833)}\n`;
        report += `- Tope Vizzoti Aplicado                   : ${formatCurrency(results.baseLCT)}\n\n`;

        report += `>> LEY 27.802 (Modernización Laboral)\n`;
        report += `- Base Remunerativa Pura (Sin SAC)        : ${formatCurrency(inputs.mrmnh)}\n`;
        report += `- Tope Vizzoti Aplicado                   : ${formatCurrency(results.baseNueva)}\n\n`;

        report += `------------------------------------------------------------------\n`;
        report += `3. CUADRO COMPARATIVO (RUBROS INDEMNIZATORIOS)\n`;
        report += `------------------------------------------------------------------\n`;
        report += `CONCEPTO                       LEY ANTERIOR       NUEVA LEY       DIFERENCIA (NOM/PORC)\n`;
        report += `------------------------------------------------------------------\n`;
        const padConcept = (str) => str.padEnd(30, ' ');
        const padAmount = (val) => formatCurrency(val).padEnd(16, ' ');
        const padDiff = (ant, nue) => {
            const diff = nue - ant;
            const pct = getDiffPct(ant, nue);
            return `${formatCurrency(diff)} (${pct > 0 ? '+' : ''}${pct.toFixed(1)}%)`;
        };

        report += `${padConcept('Indemnizac. x Antigüedad')} ${padAmount(results.lct.antiguedad)} ${padAmount(results.nueva.antiguedad)} ${padDiff(results.lct.antiguedad, results.nueva.antiguedad)}\n`;
        report += `${padConcept(`Preaviso Omitido (${results.mesesPreaviso < 1 ? '15d' : results.mesesPreaviso + 'm'})`)} ${padAmount(results.lct.preaviso)} ${padAmount(results.nueva.preaviso)} ${padDiff(results.lct.preaviso, results.nueva.preaviso)}\n`;
        report += `${padConcept('Integración Mes Despido')} ${padAmount(results.lct.integracion)} ${padAmount(results.nueva.integracion)} ${padDiff(results.lct.integracion, results.nueva.integracion)}\n`;
        report += `------------------------------------------------------------------\n`;

        report += `4. LIQUIDACIÓN FINAL (RUBROS REMUNERATIVOS EN AMBOS)\n`;
        report += `------------------------------------------------------------------\n`;
        report += `${padConcept('SAC Proporcional Semestre')} ${padAmount(results.sacProporcionalLiquidacion)} ${padAmount(results.sacProporcionalLiquidacion)}   $0 (0.0%)\n`;
        report += `${padConcept('Vacaciones Proporcionales')} ${padAmount(results.valorVacacionesProp)} ${padAmount(results.valorVacacionesProp)}   $0 (0.0%)\n`;
        report += `${padConcept('SAC s/ Vacaciones Prop.')} ${padAmount(results.sacVacaciones)} ${padAmount(results.sacVacaciones)}   $0 (0.0%)\n`;
        report += `------------------------------------------------------------------\n`;
        report += `${padConcept('TOTAL A PERCIBIR')} ${padAmount(results.lct.total)} ${padAmount(results.nueva.total)} ${padDiff(results.lct.total, results.nueva.total)}\n\n`;


        report += `------------------------------------------------------------------\n`;
        report += `5. NOTAS LEGALES Y TÉCNICAS (OBLIGATORIAS)\n`;
        report += `------------------------------------------------------------------\n`;
        report += `>> FONDO DE ASISTENCIA LABORAL (FAL)\n`;
        if (results.isPostFAL) {
            report += `El despido es posterior al 1 de junio de 2026. El empleador podría tener fondos acumulados en el FAL para cubrir total o parcialmente este pasivo.\n`;
        } else {
            report += `Si el despido fuese posterior al 1 de junio de 2026, aplicaría el sistema de acumulación del Fondo de Asistencia Laboral (FAL).\n`;
        }
        report += `Aporte: ${inputs.tipoEmpresa === 'MiPyME' ? '2.5%' : '1%'} mensual sobre masa salarial.\n\n`;

        report += `>> PAGO JUDICIAL Y CUOTAS\n`;
        report += `Ante condena judicial firme, la nueva ley habilita el pago fraccionado en hasta ${inputs.tipoEmpresa === 'MiPyME' ? '12' : '6'} cuotas.\n`;
        report += `Las cuotas serán ajustadas mensualmente por Índice de Precios al Consumidor (IPC) + 3% anual, derogando el sistema de tasas de interés activas.\n\n`;

        report += `------------------------------------------------------------------\n`;
        report += `RAMUX\n`;
        report += `CEO & Founder: Fernando Silguero Ramirez\n`;
        report += `Profesional en Gestión de RRHH - Fac. de Cs. Económicas - UNER.\n`;
        report += `------------------------------------------------------------------\n`;
        report += `AVISO: Este informe es orientativo y simulado. Debe ser validado\n`;
        report += `por un profesional antes de cualquier acción legal o contable.\n`;
        report += `------------------------------------------------------------------\n`;

        return report;
    };

    const handleCopyReport = async () => {
        const textToCopy = generateReportText();
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const renderTableRow = (label, ant, nue, tooltip = null) => {
        const diff = getDiff(ant, nue);
        const pct = getDiffPct(ant, nue);
        const isNegative = diff < 0;

        return (
            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 text-slate-300 font-medium flex items-center gap-2">
                    {label}
                    {tooltip && (
                        <div className="group relative">
                            <Info size={14} className="text-slate-500 hover:text-sky-400 cursor-help" />
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-slate-800 text-xs text-slate-300 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-slate-700 leading-relaxed text-center">
                                {tooltip}
                            </div>
                        </div>
                    )}
                </td>
                <td className="py-3 px-4 text-slate-300 text-right">{formatCurrency(ant)}</td>
                <td className="py-3 px-4 text-white text-right font-semibold relative overflow-hidden">
                    <span className="relative z-10">{formatCurrency(nue)}</span>
                </td>
                <td className={`py-3 px-4 text-right font-mono text-sm ${isNegative ? 'text-red-400' : diff > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {diff !== 0 ? (
                        <div className="flex flex-col items-end">
                            <span>{formatCurrency(diff)}</span>
                            <span className="text-[10px] opacity-80 uppercase tracking-wider">{pct > 0 ? '+' : ''}{pct.toFixed(1)}%</span>
                        </div>
                    ) : (
                        <span>-</span>
                    )}
                </td>
            </tr>
        );
    };

    return (
        <NeumorphicPanel className="p-0 overflow-hidden mt-12 transition-all duration-500 shadow-2xl">
            {/* Cabecera */}
            <div className="bg-gradient-to-r from-[#1c2230] to-[#151921] p-6 md:p-8 border-b border-black/20 relative">
                <div className="flex items-center gap-4 mb-2 relative z-10">
                    <div className="p-3 bg-[#12161f] rounded-xl shadow-inner border border-white/5">
                        <Scale className="text-sky-400" size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Cálculo Indemnizatorio Comparativo</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#1a1f2b] text-slate-500 border border-black/20">LCT 20.744</span>
                            <span className="text-slate-600 text-[10px] uppercase font-bold tracking-widest">vs</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20">Ley 27.802</span>
                        </div>
                    </div>
                </div>
                <p className="text-slate-400 text-sm mt-4 lg:w-3/4 relative z-10">
                    Simula la indemnización por despido sin justa causa, comparando el Régimen Anterior y el Nuevo Régimen de Modernización Laboral.
                </p>
            </div>

            <div className="p-6 md:p-8 space-y-8">
                {/* Formulario */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-indigo-300 text-sm font-semibold uppercase tracking-wider mb-2">
                            <Calendar size={16} /> Fechas
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Fecha de Ingreso</label>
                            <input
                                type="date"
                                name="fechaIngreso"
                                value={inputs.fechaIngreso} onChange={handleInputChange}
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Fecha de Despido</label>
                            <input
                                type="date"
                                name="fechaDespido"
                                value={inputs.fechaDespido} onChange={handleInputChange}
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 lg:col-span-2">
                        <div className="flex items-center gap-2 text-indigo-300 text-sm font-semibold uppercase tracking-wider mb-2">
                            <DollarSign size={16} /> Remuneraciones y Topes
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">
                                    Mejor Remuneración (MRMNH) <Info size={12} className="inline ml-1 text-slate-500" />
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-3 top-2 text-slate-500">$</span>
                                    <input
                                        type="number"
                                        name="mrmnh"
                                        placeholder="Ej: 1000000"
                                        value={inputs.mrmnh} onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-8 pr-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-600"
                                    />
                                    <div className="absolute left-0 bottom-full mb-2 w-72 p-3 bg-slate-800 text-xs text-slate-300 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-amber-700/50 leading-relaxed">
                                        <span className="text-amber-400 font-bold block mb-1">⚠️ Auditoría de Conceptos:</span>
                                        Confirma que esta suma <b>no incluye</b> bonos anuales, premios por única vez o rubros no remunerativos no habituales.
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">
                                    Tope de Convenio (3x Salario)
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-3 top-2 text-slate-500">$</span>
                                    <input
                                        type="number"
                                        name="topeConvenio"
                                        placeholder="Opcional"
                                        value={inputs.topeConvenio} onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-8 pr-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-600"
                                    />
                                    <div className="absolute left-0 bottom-full mb-2 w-72 p-3 bg-slate-800 text-xs text-slate-300 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-sky-700/50 leading-relaxed">
                                        <span className="text-sky-400 font-bold block mb-1">ℹ️ Jerarquía de Topes:</span>
                                        Aplica el límite convencional. Por mandato constitucional (Fallo Vizzoti), la base no puede reducirse a menos del 67% de la MRMNH del régimen respectivo.
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs text-slate-400 mb-1">Clasificación de Empresa</label>
                                <div className="relative">
                                    <Building2 size={16} className="absolute left-3 top-2.5 text-slate-500" />
                                    <select
                                        name="tipoEmpresa"
                                        value={inputs.tipoEmpresa} onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
                                    >
                                        <option value="Gran Empresa">Gran Empresa</option>
                                        <option value="MiPyME">MiPyME</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pt-2">
                    <button
                        onClick={calculate}
                        className="bg-sky-500 hover:bg-sky-400 text-white px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95"
                    >
                        <Calculator size={20} /> Calcular Indemnización
                    </button>
                </div>

                {/* Resultados */}
                {results && (
                    <div className="mt-8 space-y-6 animate-fade-in border-t border-indigo-500/20 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Tabla Comparativa</h3>
                                <p className="text-slate-400 text-sm">
                                    Antigüedad computable: <span className="text-indigo-400 font-semibold">{results.aniosAntiguedad} año(s)</span>
                                </p>
                            </div>
                            <button
                                onClick={handleCopyReport}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${isCopied
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                                    }`}
                            >
                                {isCopied ? <><Check size={16} /> ¡Copiado!</> : <><Copy size={16} /> Copiar Informe</>}
                            </button>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-slate-700/60 bg-slate-800/30">
                            <div className="bg-slate-800/90 text-xs px-4 py-3 border-b border-slate-700/80 uppercase font-semibold flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                <span className="text-slate-400">Bases Tomadas para Indemnización por Antigüedad:</span>
                                <div className="flex flex-col text-left md:text-right gap-1 bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                                    <span><span className="text-slate-500">LCT 20.744:</span> <span className="text-indigo-200">{formatCurrency(results.baseLCT)}</span></span>
                                    <span><span className="text-slate-500">Ley 27.802:</span> <span className="text-indigo-400">{formatCurrency(results.baseNueva)}</span></span>
                                </div>
                            </div>
                            <table className="w-full text-sm text-left border-t border-slate-700">
                                <thead className="text-xs uppercase bg-slate-800/80 text-slate-400 border-b border-slate-700/80">
                                    <tr>
                                        <th className="py-3 px-4">Rubros Indemnizatorios</th>
                                        <th className="py-3 px-4 text-right">LEY ANTERIOR</th>
                                        <th className="py-3 px-4 text-right text-indigo-300">NUEVA LEY</th>
                                        <th className="py-3 px-4 text-right">DIFERENCIA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableRow(
                                        "Indemnización x Antigüedad (Art. 245)",
                                        results.lct.antiguedad,
                                        results.nueva.antiguedad,
                                        "El Fallo Vizzoti (piso 67%) aplica constitucionalmente en ambas leyes para proteger el salario real."
                                    )}
                                    {renderTableRow(
                                        `Preaviso Omitido (${results.mesesPreaviso < 1 ? '15 días' : results.mesesPreaviso + ' mes/es'})`,
                                        results.lct.preaviso,
                                        results.nueva.preaviso,
                                        "Aplica plazos Art. 231 LCT. Ley 27.802 excluye incidencia de SAC."
                                    )}
                                    {renderTableRow(
                                        "Integración Mes de Despido",
                                        results.lct.integracion,
                                        results.nueva.integracion,
                                        "LCT 20.744 aplica Base con SAC (+8.33%). Ley 27.802 excluye incidencia de SAC."
                                    )}
                                </tbody>
                                <thead className="text-xs uppercase bg-slate-800/80 text-slate-400 border-y border-slate-700/80 mt-2">
                                    <tr>
                                        <th className="py-2 px-4" colSpan={4}>Liquidación Final (Rubros Remunerativos sin cambios)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableRow(
                                        "SAC Proporcional Semestre",
                                        results.sacProporcionalLiquidacion,
                                        results.sacProporcionalLiquidacion,
                                        "Liquidación final proporcional a los días transcurridos del semestre en curso."
                                    )}
                                    {renderTableRow(
                                        "Vacaciones Proporcionales",
                                        results.valorVacacionesProp,
                                        results.valorVacacionesProp,
                                        "Sueldo / 25 * días prop (Art. 150/155 LCT). Se devenga en ambas leyes sin distinción."
                                    )}
                                    {renderTableRow(
                                        "SAC s/ Vacaciones Prop.",
                                        results.sacVacaciones,
                                        results.sacVacaciones,
                                        "Proporcional aplicable al rubro vacaciones."
                                    )}
                                </tbody>
                                <tfoot className="border-t-2 border-slate-700 bg-slate-800/50">
                                    <tr>
                                        <th className="py-4 px-4 text-base text-white">Total a Percibir</th>
                                        <th className="py-4 px-4 text-base text-right text-white font-mono">{formatCurrency(results.lct.total)}</th>
                                        <th className="py-4 px-4 text-base text-right text-indigo-400 font-mono font-bold">{formatCurrency(results.nueva.total)}</th>
                                        <th className={`py-4 px-4 text-base text-right font-mono font-bold ${results.nueva.total < results.lct.total ? 'text-red-400' : 'text-emerald-400'}`}>
                                            {formatCurrency(results.nueva.total - results.lct.total)}
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Notas Legales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 text-sky-400"><ShieldCheck size={48} /></div>
                                <h4 className="flex items-center gap-2 text-sky-400 font-bold mb-3 text-sm uppercase tracking-wide">
                                    <AlertCircle size={16} /> Fondo de Asistencia Laboral (FAL)
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                                    {results.isPostFAL
                                        ? "El despido es posterior al 1 de junio de 2026. El empleador podría tener fondos acumulados en el FAL para cubrir total o parcialmente este pasivo."
                                        : "Si el despido fuese posterior al 1 de junio de 2026, aplicaría el sistema de acumulación del Fondo de Asistencia Laboral (FAL)."}
                                </p>
                                <div className="text-xs text-sky-200/70 bg-sky-900/20 p-2 rounded w-max border border-sky-500/20">
                                    Aporte: <strong>{inputs.tipoEmpresa === 'MiPyME' ? '2.5%' : '1%'}</strong> mensual sobre masa salarial.
                                </div>
                            </div>

                            <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
                                <h4 className="flex items-center gap-2 text-indigo-400 font-bold mb-3 text-sm uppercase tracking-wide">
                                    <Calendar size={16} /> Pago Judicial y Cuotas
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                                    De resultar en condena judicial, el Nuevo Régimen habilita el pago simplificado en cuotas ajustables, sin necesidad de acreditar concurso preventivo.
                                </p>
                                <ul className="text-xs space-y-2 text-slate-400">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                        {inputs.tipoEmpresa === 'Gran Empresa' ? <span className="text-indigo-300 font-bold">Límite: Hasta 6 cuotas mensuales.</span> : <span>Límite (Grandes Emp.): Hasta 6 cuotas.</span>}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                        {inputs.tipoEmpresa === 'MiPyME' ? <span className="text-indigo-300 font-bold">Límite: Hasta 12 cuotas mensuales.</span> : <span>Límite (MiPyME): Hasta 12 cuotas.</span>}
                                    </li>
                                    <li className="flex gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></div>
                                        <span className="text-amber-200/80">Actualización en cuotas y mora: Se abandona el sistema de tasas activas. El nuevo marco impone actualización por Índice de Precios al Consumidor (IPC) más un 3% anual.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Firma y Disclaimer */}
                        <div className="border border-indigo-500/30 rounded-xl bg-slate-900/80 p-6 relative overflow-hidden mt-6">
                            {/* Background glows removed for performance */}
                            <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4 relative z-10">
                                <div>
                                    <h5 className="text-white font-bold tracking-widest text-lg">RAMUX</h5>
                                    <p className="text-indigo-300 text-sm font-medium mt-1">CEO & Founder: Fernando Silguero Ramirez</p>
                                    <p className="text-slate-400 text-xs mt-0.5">Profesional en Gestión de RRHH - Fac. de Cs. Económicas - UNER.</p>
                                </div>
                                <div className="p-2 bg-indigo-500/10 rounded-lg">
                                    <Scale className="text-indigo-400 opacity-50" size={24} />
                                </div>
                            </div>
                            <div className="text-xs text-slate-500 leading-relaxed max-w-3xl relative z-10">
                                <strong className="text-slate-400">AVISO:</strong> Este informe es orientativo y simulado. Debe ser validado
                                por un profesional antes de cualquier acción legal o contable.
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </NeumorphicPanel>
    );
}
