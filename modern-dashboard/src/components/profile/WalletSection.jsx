import React from 'react';
import { Wallet, TrendingUp, History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';

const WalletSection = ({ balance = "12,450.00", roiChange = "+15.2%", history = [] }) => {
    // Mini Chart Data
    const dataPoints = [30, 45, 35, 60, 55, 80, 75, 95];
    const maxVal = Math.max(...dataPoints);
    const minVal = Math.min(...dataPoints);
    const range = maxVal - minVal;
    
    // Convert data to SVG path points
    const points = dataPoints.map((val, i) => {
        const x = (i / (dataPoints.length - 1)) * 200;
        const y = 60 - ((val - minVal) / range) * 50;
        return `${x},${y}`;
    }).join(' ');

    const defaultHistory = [
        { id: 1, type: 'gain', amount: '+50 RMX', label: 'Cursos completados', date: 'Hoy' },
        { id: 2, type: 'gain', amount: '+120 RMX', label: 'Simulador: Profit Directo', date: 'Ayer' },
        { id: 3, type: 'spend', amount: '-30 RMX', label: 'Módulo Premium: Opciones', date: '14 Mar' },
    ];

    const currentHistory = history.length > 0 ? history : defaultHistory;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {/* Wallet & ROI Card */}
            <GlassPanel className="p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl group-hover:bg-sky-500/10 transition-all" />
                
                <div className="space-y-10 relative z-10">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <p className="text-slate-500 font-black text-xs uppercase tracking-[0.3em]">Balance Total RMX</p>
                            <div className="flex items-center gap-3">
                                <h3 className="text-4xl font-black text-white tracking-tighter italic">${balance}</h3>
                                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                    <Wallet size={20} className="text-[#F76B1C]" />
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-emerald-400 font-black text-sm">{roiChange}</p>
                            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">Performance ROI</p>
                        </div>
                    </div>

                    {/* SVG Line Chart */}
                    <div className="relative h-24 w-full group/chart">
                        <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                d={`M 0,60 L ${points} L 200,60 Z`}
                                fill="url(#chartGradient)"
                                className="transition-all duration-1000"
                            />
                            <polyline
                                points={points}
                                fill="none"
                                stroke="#0ea5e9"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                            />
                        </svg>
                        <div className="absolute top-0 left-0 w-full h-full border-b border-white/5 pointer-events-none" />
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-grow bg-[#F76B1C] hover:bg-orange-500 text-white font-black py-4 px-6 rounded-2xl text-[10px] uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/20">
                            Depositar Funds
                        </button>
                        <button className="flex-grow bg-white/5 hover:bg-white/10 text-white font-black py-4 px-6 rounded-2xl text-[10px] uppercase tracking-widest transition-all border border-white/10">
                            Retirar / Trade
                        </button>
                    </div>
                </div>
            </GlassPanel>

            {/* Transaction History Card */}
            <GlassPanel className="p-10 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <History size={20} className="text-slate-400" />
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Historial Financiero</h4>
                    </div>
                    <button className="text-[10px] font-black text-sky-400 uppercase tracking-widest hover:text-sky-300 transition-colors">
                        Ver Todo
                    </button>
                </div>

                <div className="flex-grow space-y-4">
                    {currentHistory.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all group/item">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-xl ${item.type === 'gain' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                    {item.type === 'gain' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-white uppercase tracking-tight">{item.label}</p>
                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{item.date}</p>
                                </div>
                            </div>
                            <p className={`text-xs font-black font-mono ${item.type === 'gain' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {item.amount}
                            </p>
                        </div>
                    ))}
                </div>
            </GlassPanel>
        </div>
    );
};

export default WalletSection;
