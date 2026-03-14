import React from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { Activity, TrendingUp, BarChart2 } from 'lucide-react';

const MarketSimulator = () => {
    return (
        <NeumorphicPanel radiance="blue" className="h-full min-h-[400px] flex flex-col p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F76B1C]/10 flex items-center justify-center shadow-inner border border-[#F76B1C]/10">
                        <Activity className="text-[#F76B1C]" size={24} />
                    </div>
                    <div>
                        <h3 className="font-extrabold text-white text-xl tracking-tight">Simulador de Mercado</h3>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-[#F76B1C] uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F76B1C] animate-pulse"></span>
                            Live_Feeds: Active
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Inset */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-[#12161f] p-5 rounded-[24px] shadow-inner border border-black/10">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">MVAL_Index</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">1.245</span>
                        <TrendingUp size={16} className="text-emerald-500" />
                    </div>
                    <p className="text-[10px] text-emerald-500 mt-1 font-bold">+2.4% (24H)</p>
                </div>
                <div className="bg-[#12161f] p-5 rounded-[24px] shadow-inner border border-black/10">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">AL30D_Core</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">64.20</span>
                        <TrendingUp size={16} className="text-[#F76B1C]" />
                    </div>
                    <p className="text-[10px] text-[#F76B1C] mt-1 font-bold">+1.1% (24H)</p>
                </div>
            </div>

            {/* Visualizer Area (Deep Inset) */}
            <div className="flex-grow bg-[#0d1017] rounded-[24px] shadow-inner border border-black/20 flex flex-col items-center justify-center text-slate-600 relative overflow-hidden">
                <BarChart2 size={40} className="mb-4 opacity-20" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
                    Initializing_Analytics_Module...
                </p>
                
                {/* Decorative background grid */}
                <div className="absolute inset-0 [background-size:30px_30px] [background-image:linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] opacity-50 z-[-1]"></div>
            </div>
        </NeumorphicPanel>
    );
};

export default MarketSimulator;
