import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import NeumorphicPanel from '../ui/NeumorphicPanel';

// 1. Componente Skeleton (Montaje ultra ligero)
const WidgetSkeleton = () => (
    <div className="bg-[#1a1f2b] p-6 h-[120px] rounded-3xl animate-pulse shadow-sm flex flex-col justify-between border border-white/5">
        <div className="flex justify-between">
            <div className="h-3 w-20 bg-slate-800 rounded"></div>
            <div className="h-5 w-10 bg-slate-800 rounded-lg"></div>
        </div>
        <div className="h-8 w-32 bg-slate-800 rounded-lg mt-4"></div>
    </div>
);

// 2. Financial Widget Presentacional
const FinancialWidget = React.memo(({ title, value, previousValue, prefix = '$', suffix = '', type = 'default' }) => {
    const numericValue = parseFloat(value?.toString().replace(/,/g, '') || '0');
    const numericPrev = parseFloat(previousValue?.toString().replace(/,/g, '') || '0');

    let trend = 'neutral';
    let diffPercent = 0;

    if (numericPrev > 0) {
        diffPercent = ((numericValue - numericPrev) / numericPrev) * 100;
        if (diffPercent > 0.01) trend = 'up';
        else if (diffPercent < -0.01) trend = 'down';
    }

    const isAccent = type === 'accent';
    let trendColorClass = 'text-slate-400 bg-[#12161f] shadow-inner';
    let TrendIcon = Minus;

    if (trend === 'up') {
        trendColorClass = 'text-emerald-500 bg-emerald-500/5 shadow-inner border border-emerald-500/10';
        TrendIcon = TrendingUp;
    } else if (trend === 'down') {
        trendColorClass = 'text-red-500 bg-red-500/5 shadow-inner border border-red-500/10';
        TrendIcon = TrendingDown;
    }

    return (
        <NeumorphicPanel className="p-6 flex flex-col justify-between h-[120px]">
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">{title}</h4>

                {previousValue && (
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 ${trendColorClass}`}>
                        <TrendIcon size={10} strokeWidth={3} />
                        {Math.abs(diffPercent).toFixed(1)}%
                    </span>
                )}
            </div>

            <div className="flex items-baseline gap-1">
                {prefix && <span className={`text-sm font-bold ${isAccent ? 'text-[#F76B1C]' : 'text-slate-400'}`}>{prefix}</span>}
                <span className={`text-2xl font-black tabular-nums tracking-tight ${isAccent ? 'text-[#F76B1C]' : 'text-white'}`}>
                    {value.toLocaleString('es-AR')}
                </span>
                {suffix && <span className="text-slate-400 font-bold ml-1 text-xs">{suffix}</span>}
            </div>
        </NeumorphicPanel>
    );
});

// 3. Contenedor Principal Lógico
const BCRAWidgets = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const simulateFetch = () => {
            setTimeout(() => {
                const mockData = {
                    oficial: { current: 1050.50, prev: 1049.00 },
                    blue: { current: 1180.00, prev: 1150.00 },
                    tasa: { current: 40.00, prev: 40.00 },
                    uva: { current: 1150.23, prev: 1140.50 }
                };

                if (isMounted) {
                    requestAnimationFrame(() => {
                        setData(mockData);
                        setLoading(false);
                    });
                }
            }, 1000);
        };
        simulateFetch();
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="w-full mb-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => <WidgetSkeleton key={`skeleton-${i}`} />)
                ) : (
                    <>
                        <FinancialWidget
                            title="Dólar Oficial"
                            value={data.oficial.current}
                            previousValue={data.oficial.prev}
                        />
                        <FinancialWidget
                            title="Dólar Blue"
                            value={data.blue.current}
                            previousValue={data.blue.prev}
                            type="accent"
                        />
                        <FinancialWidget
                            title="Tasa BCRA"
                            value={data.tasa.current}
                            previousValue={data.tasa.prev}
                            prefix=""
                            suffix="%"
                        />
                        <FinancialWidget
                            title="Valor UVA"
                            value={data.uva.current}
                            previousValue={data.uva.prev}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default BCRAWidgets;
