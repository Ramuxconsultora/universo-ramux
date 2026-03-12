import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import { Activity, TrendingUp, BarChart2 } from 'lucide-react';

const MarketSimulator = () => {
    return (
        <GlassPanel className="h-full min-h-[400px] flex flex-col relative overflow-hidden group border border-[#7B39FC]/50 shadow-[0_0_15px_rgba(123,57,252,0.2)] hover:shadow-[0_0_25px_rgba(123,57,252,0.6)] transition-all duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 z-10 relative">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <Activity className="text-emerald-400" size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg tracking-wide">Simulador de Mercado</h3>
                        <div className="flex items-center gap-2 text-xs text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Datos en Tiempo Real (Simulación)
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Metrics Placeholder */}
            <div className="grid grid-cols-2 gap-4 mb-6 z-10 relative">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <p className="text-xs text-slate-500 font-mono mb-1">MVAL Core</p>
                    <p className="text-xl font-bold text-white font-mono flex items-center gap-2">
                        1.245.890 <TrendingUp size={16} className="text-emerald-400" />
                    </p>
                    <p className="text-xs text-emerald-400 mt-1">+2.4% (24h)</p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <p className="text-xs text-slate-500 font-mono mb-1">AL30D</p>
                    <p className="text-xl font-bold text-white font-mono flex items-center gap-2">
                        64.20 <TrendingUp size={16} className="text-emerald-400" />
                    </p>
                    <p className="text-xs text-emerald-400 mt-1">+1.1% (24h)</p>
                </div>
            </div>

            {/* Chart Area Placeholder (SVG/Canvas target) */}
            <div className="flex-grow bg-[#020202] rounded-xl border border-emerald-500/50 shadow-[inset_0_0_30px_rgba(16,185,129,0.15)] flex flex-col items-center justify-center text-emerald-500 relative z-10 overflow-hidden">
                <BarChart2 size={48} className="mb-4 opacity-80" />
                <p className="text-sm font-mono border border-emerald-500/30 bg-emerald-900/20 px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    &gt; INIT CANVAS_CHARTING_MODULE...
                </p>

                {/* Scanline removed for performance */}

                {/* Decorative background grid for the "chart" look */}
                <div className="absolute inset-0 border-[0.5px] border-emerald-900/40 [background-size:20px_20px] [background-image:linear-gradient(to_right,#064e3b_1px,transparent_1px),linear-gradient(to_bottom,#064e3b_1px,transparent_1px)] opacity-40 z-[-1] rounded-xl"></div>
            </div>

            {/* Animated Glow Effect background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700 z-0"></div>
        </GlassPanel>
    );
};

export default MarketSimulator;
