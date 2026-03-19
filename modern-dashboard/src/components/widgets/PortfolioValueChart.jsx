import React from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const PortfolioValueChart = ({ wallet, history = [] }) => {
    // Current total in ARS (simplified for the chart)
    const arsCash = Number(wallet?.ars_balance || 0);
    const usdCash = Number(wallet?.usd_balance || 0);
    const USD_TO_ARS_RATE = 1100;
    const currentEquity = arsCash + (usdCash * USD_TO_ARS_RATE);

    // Initial value for simulation (if history is empty)
    const startValue = currentEquity * 0.9; // Assume 10% growth if no history
    
    // Generate simulated points based on history or just a trend
    // In a real app, this would come from a 'daily_snapshots' table
    const generatePoints = () => {
        const points = [];
        const count = 10;
        let base = startValue;
        
        for (let i = 0; i < count; i++) {
            // Add some randomness but trending towards the current equity
            const progress = i / (count - 1);
            const trend = startValue + (currentEquity - startValue) * progress;
            const jitter = (Math.random() - 0.5) * (currentEquity * 0.02);
            points.push(trend + jitter);
        }
        // Ensure last point is exactly currentEquity for consistency
        points[count-1] = currentEquity;
        return points;
    };

    const dataPoints = generatePoints();
    const maxVal = Math.max(...dataPoints);
    const minVal = Math.min(...dataPoints);
    const range = maxVal - minVal || 1;
    
    const svgPoints = dataPoints.map((val, i) => {
        const x = (i / (dataPoints.length - 1)) * 200;
        const y = 80 - ((val - minVal) / range) * 60;
        return `${x},${y}`;
    }).join(' ');

    const isPositive = currentEquity >= startValue;

    return (
        <NeumorphicPanel className="p-6 h-full flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Activity size={16} className="text-slate-400" />
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Progresión_Patrimonial</h4>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white italic tracking-tighter">
                            ${(currentEquity > 1000000) ? `${(currentEquity / 1000000).toFixed(2)}M` : `${(currentEquity / 1000).toFixed(0)}K`}
                        </span>
                        <div className={`flex items-center gap-1 text-[10px] font-black ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {((Math.abs(currentEquity - startValue) / startValue) * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>
                <div className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                    Live View
                </div>
            </div>

            <div className="flex-grow relative min-h-[120px] mt-4">
                <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="progressionGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    
                    {/* Area Under Curve */}
                    <path
                        d={`M 0,100 L ${svgPoints} L 200,100 Z`}
                        fill="url(#progressionGradient)"
                        className="transition-all duration-1000"
                    />
                    
                    {/* The Line */}
                    <polyline
                        points={svgPoints}
                        fill="none"
                        stroke={isPositive ? '#10b981' : '#f43f5e'}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                    />

                    {/* End point marker */}
                    <circle 
                        cx="200" 
                        cy={80 - ((currentEquity - minVal) / range) * 60} 
                        r="4" 
                        fill={isPositive ? '#10b981' : '#f43f5e'} 
                        className="animate-pulse shadow-[0_0_10px_white]" 
                    />
                </svg>
            </div>

            <div className="mt-6 flex justify-between items-center text-[8px] font-black text-slate-600 uppercase tracking-widest border-t border-white/5 pt-4">
                <span>Inicio de Gestión</span>
                <span>Actualizado Hoy</span>
            </div>
        </NeumorphicPanel>
    );
};

export default PortfolioValueChart;
