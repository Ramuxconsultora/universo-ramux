import React from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { PieChart as PieIcon, Info } from 'lucide-react';

const PortfolioPieChart = ({ data = [] }) => {
    // Default data if none provided
    const items = data.length > 0 ? data : [
        { name: 'Efectivo', value: 65, color: '#F76B1C' },
        { name: 'Cedears', value: 20, color: '#0ea5e9' },
        { name: 'Bonos', value: 10, color: '#10b981' },
        { name: 'Acciones', value: 5, color: '#8b5cf6' },
    ];

    const total = items.reduce((acc, item) => acc + item.value, 0);
    let cumulativePercent = 0;

    const getCoordinatesForPercent = (percent) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    return (
        <NeumorphicPanel className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <PieIcon size={18} className="text-slate-400" />
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Distribución_Cartera</h4>
                </div>
                <Info size={14} className="text-slate-600 cursor-help" />
            </div>

            <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8">
                {/* SVG Pie Chart */}
                <div className="relative w-32 h-32">
                    <svg viewBox="-1 -1 2" className="transform -rotate-90 w-full h-full">
                        {items.map((item, index) => {
                            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                            cumulativePercent += item.value / total;
                            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                            const largeArcFlag = item.value / total > 0.5 ? 1 : 0;
                            const pathData = [
                                `M ${startX} ${startY}`,
                                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                                `L 0 0`,
                            ].join(' ');

                            return (
                                <path
                                    key={index}
                                    d={pathData}
                                    fill={item.color}
                                    className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                                />
                            );
                        })}
                        {/* Center hole for donut effect */}
                        <circle cx="0" cy="0" r="0.6" fill="#02040a" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Total</span>
                        <span className="text-xs font-black text-white italic">100%</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="space-y-3 w-full max-w-[150px]">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.name}</span>
                            </div>
                            <span className="text-[10px] font-black text-white italic">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 opacity-50">
                <p className="text-[8px] font-bold text-slate-600 text-center uppercase tracking-[0.2em]">Data_Source: Internal_Ledger</p>
            </div>
        </NeumorphicPanel>
    );
};

export default PortfolioPieChart;
