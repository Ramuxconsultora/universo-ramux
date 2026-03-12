import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// 1. Componente Skeleton (Montaje ultra ligero)
const WidgetSkeleton = () => (
    <div className="widget-card-performance p-5 h-[110px] flex flex-col justify-between">
        <div className="flex justify-between">
            <div className="h-4 w-24 rounded skeleton-fast"></div>
            <div className="h-4 w-12 rounded skeleton-fast"></div>
        </div>
        <div className="flex items-baseline gap-1 mt-4">
            <div className="h-6 w-6 rounded skeleton-fast"></div>
            <div className="h-8 w-28 rounded skeleton-fast"></div>
        </div>
    </div>
);

// 2. Financial Widget Presentacional (Sin re-renders innecesarios)
const FinancialWidget = React.memo(({ title, value, previousValue, prefix = '$', suffix = '', type = 'default' }) => {
    // Calculamos la tendencia
    const numericValue = parseFloat(value?.toString().replace(/,/g, '') || '0');
    const numericPrev = parseFloat(previousValue?.toString().replace(/,/g, '') || '0');

    let trend = 'neutral';
    let diffPercent = 0;

    if (numericPrev > 0) {
        diffPercent = ((numericValue - numericPrev) / numericPrev) * 100;
        if (diffPercent > 0.01) trend = 'up';
        else if (diffPercent < -0.01) trend = 'down';
    }

    // Colores según tendencia (o tipo especial como 'accent' para Blue)
    const isAccent = type === 'accent';
    let trendColorClass = 'text-slate-400 bg-slate-800/50';
    let TrendIcon = Minus;

    if (trend === 'up') {
        trendColorClass = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        TrendIcon = TrendingUp;
    } else if (trend === 'down') {
        trendColorClass = 'text-red-500 bg-red-500/10 border-red-500/20';
        TrendIcon = TrendingDown;
    }

    return (
        <div className="widget-card-performance p-5 flex flex-col justify-between h-[110px]">
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-slate-400 text-xs md:text-sm font-semibold uppercase tracking-wider">{title}</h4>

                {previousValue && (
                    <span className={`text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 ${trendColorClass}`}>
                        <TrendIcon size={10} strokeWidth={3} />
                        {Math.abs(diffPercent).toFixed(1)}%
                    </span>
                )}
            </div>

            <div className="flex items-baseline gap-1">
                {prefix && <span className={`font-bold ${isAccent ? 'text-emerald-500' : 'text-slate-500'}`}>{prefix}</span>}
                <span className={`text-2xl md:text-3xl font-bold tabular-nums tracking-tight ${isAccent ? 'text-white' : 'text-slate-100'}`}>
                    {value.toLocaleString('es-AR')}
                </span>
                {suffix && <span className="text-slate-500 font-bold ml-0.5">{suffix}</span>}
            </div>
        </div>
    );
});

// 3. Contenedor Principal Lógico
const BCRAWidgets = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // Simulación de fetch a nuestra caché/Edge Function con retardo intencional
        // para demostrar la fluidez del Skeleton (sin bloqueos).
        const simulateFetch = () => {
            setTimeout(() => {
                const mockData = {
                    oficial: { current: 1050.50, prev: 1049.00 },
                    blue: { current: 1180.00, prev: 1150.00 },
                    tasa: { current: 40.00, prev: 40.00 },
                    uva: { current: 1150.23, prev: 1140.50 }
                };

                if (isMounted) {
                    // requestAnimationFrame para sincronizar con el repintado del monitor
                    requestAnimationFrame(() => {
                        setData(mockData);
                        setLoading(false);
                    });
                }
            }, 1500); // 1.5s de carga simulada
        };

        simulateFetch();

        return () => { isMounted = false; };
    }, []);

    return (
        <div className="w-full mb-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {loading ? (
                    // Array de 4 Skeletons para carga inicial
                    Array.from({ length: 4 }).map((_, i) => <WidgetSkeleton key={`skeleton-${i}`} />)
                ) : (
                    // Datos Renderizados Realmente
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
