import React, { useEffect, useRef } from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';

const TradingViewChart = ({ data = [], symbol = "GGAL" }) => {
    const chartContainerRef = useRef();

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Use the global instance from CDN
        const createChart = window.LightweightCharts?.createChart;
        if (!createChart) {
            console.error("LightweightCharts not found");
            return;
        }

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            layout: {
                background: { color: 'transparent' },
                textColor: '#94a3b8',
            },
            grid: {
                vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
                horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
            },
            crosshair: {
                mode: 1, // Magnet
            },
            timeScale: {
                borderColor: 'rgba(255, 255, 255, 0.1)',
            },
        });

        const lineSeries = chart.addAreaSeries({
            lineColor: '#F76B1C',
            topColor: 'rgba(247, 107, 28, 0.3)',
            bottomColor: 'rgba(247, 107, 28, 0.0)',
            lineWidth: 2,
        });

        // Simple mock historical data if none provided, 
        // in a real app we'd fetch historical prices from Supabase
        const chartData = data.length > 0 ? data : [
            { time: '2026-03-10', value: 4500.5 },
            { time: '2026-03-11', value: 4620.2 },
            { time: '2026-03-12', value: 4580.8 },
            { time: '2026-03-13', value: 4710.4 },
            { time: '2026-03-14', value: 4850.1 },
            { time: '2026-03-15', value: 4800.5 },
            { time: '2026-03-16', value: 4920.0 },
        ];

        lineSeries.setData(chartData);

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data]);

    return (
        <NeumorphicPanel className="p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-black text-white italic tracking-tight">{symbol}_MARKET_CHART</h3>
                    <p className="text-[10px] font-bold text-[#F76B1C] uppercase tracking-widest mt-1">Real_Time: Connected</p>
                </div>
                <div className="flex gap-2">
                    {['1D', '1W', '1M', '1Y', 'ALL'].map(time => (
                        <button key={time} className="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-black text-slate-500 hover:text-white transition-colors border border-white/5 uppercase">
                            {time}
                        </button>
                    ))}
                </div>
            </div>
            <div ref={chartContainerRef} className="w-full" />
        </NeumorphicPanel>
    );
};

export default TradingViewChart;
