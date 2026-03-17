import React from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { PieChart as PieIcon, Info } from 'lucide-react';

const PortfolioPieChart = ({ wallet, assets = [], quotes = [] }) => {
    // 0. Handle Loading State
    // If wallet is not available yet (initial state), show skeleton
    if (!wallet) {
        return (
            <NeumorphicPanel className="p-6 h-full flex flex-col animate-pulse">
                <div className="h-4 w-32 bg-white/5 rounded mb-8" />
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-dashed border-white/5" />
                </div>
            </NeumorphicPanel>
        );
    }

    // 1. Calculate real values
    const arsCash = Number(wallet?.ars_balance || 0);
    const usdCash = Number(wallet?.usd_balance || 0);
    const USD_TO_ARS_RATE = 1100; // Reference rate for proportional calculation
    const usdCashInArs = usdCash * USD_TO_ARS_RATE;
    
    // Default colors for common tickers
    const tickerColors = {
        'GGAL': '#0ea5e9',
        'YPFD': '#10b981',
        'PAMP': '#8b5cf6',
        'AL30': '#f59e0b',
        'USD': '#22c55e', // Green for USD
    };

    const getTickerColor = (ticker, index) => {
        if (tickerColors[ticker]) return tickerColors[ticker];
        const alternates = ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#6366f1'];
        return alternates[index % alternates.length];
    };

    // Calculate value for each active position
    const assetItems = assets.map((asset, index) => {
        const quote = quotes.find(q => q.symbol === asset.ticker);
        const currentPrice = Number(quote?.price || asset.average_price || 0);
        const quantity = Number(asset.quantity || 0);
        const rawValue = quantity * currentPrice;
        return {
            name: asset.ticker,
            rawValue: rawValue,
            displayValue: (rawValue > 1000000) ? `${(rawValue / 1000000).toFixed(1)}M` : `${(rawValue / 1000).toFixed(0)}K`,
            color: getTickerColor(asset.ticker, index)
        };
    }).filter(item => item.rawValue > 0);

    const rawTotalEquity = arsCash + usdCashInArs + assetItems.reduce((acc, item) => acc + item.rawValue, 0);

    const formatPercent = (val) => {
        if (rawTotalEquity === 0) return 0;
        const p = (val / rawTotalEquity) * 100;
        return p < 0.1 && p > 0 ? 0.1 : Number(p.toFixed(1));
    };

    const items = rawTotalEquity > 0 ? [
        { 
            name: 'Cash ARS', 
            percentage: formatPercent(arsCash), 
            display: (arsCash > 1000000) ? `$${(arsCash / 1000000).toFixed(1)}M` : `$${(arsCash / 1000).toFixed(0)}K`,
            color: '#F76B1C' 
        },
        { 
            name: 'Cash USD', 
            percentage: formatPercent(usdCashInArs), 
            display: (usdCash > 1000) ? `u$s ${(usdCash / 1000).toFixed(1)}K` : `u$s ${usdCash}`,
            color: '#22c55e' 
        },
        ...assetItems.map(item => ({
            name: item.name,
            percentage: formatPercent(item.rawValue),
            display: `$${item.displayValue}`,
            color: item.color
        }))
    ].filter(i => (i.percentage > 0 || i.percentage === 0.1)) : [
        { name: 'Sin Fondos', percentage: 100, display: '$0', color: '#334155' }
    ];

    const totalPerc = items.reduce((acc, item) => acc + item.percentage, 0);
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
                    <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full">
                        {items.length === 1 ? (
                            <circle cx="0" cy="0" r="1" fill={items[0].color} className="transition-all duration-500" />
                        ) : (
                            items.map((item, index) => {
                                if (totalPerc === 0) return null;
                                const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                                cumulativePercent += item.percentage / totalPerc;
                                const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                                const largeArcFlag = item.percentage / totalPerc > 0.5 ? 1 : 0;
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
                            })
                        )}
                        {/* Center hole for donut effect */}
                        <circle cx="0" cy="0" r="0.6" fill="#02040a" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Total</span>
                        <span className="text-[10px] font-black text-white italic">
                            ${(rawTotalEquity > 1000000) ? `${(rawTotalEquity / 1000000).toFixed(1)}M` : `${(rawTotalEquity / 1000).toFixed(0)}K`}
                        </span>
                    </div>
                </div>

                {/* Legend */}
                <div className="space-y-3 w-full max-w-[200px]">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between group">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]" style={{ backgroundColor: item.color }} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter truncate max-w-[70px] group-hover:text-white transition-colors">{item.name}</span>
                                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{item.display}</span>
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-white italic">{item.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 opacity-50">
                <p className="text-[8px] font-bold text-slate-600 text-center uppercase tracking-[0.2em]">Valuación_Total_Estimada</p>
            </div>
        </NeumorphicPanel>
    );
};

export default PortfolioPieChart;
