import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Activity, Clock, AlertCircle } from 'lucide-react';
import NeumorphicPanel from '../ui/NeumorphicPanel.jsx';

// 1. Componente de Carga (Skeleton)
const WidgetSkeleton = () => (
    <div className="bg-[#1a1f2b] p-5 h-[110px] rounded-3xl animate-pulse border border-white/5 flex flex-col justify-between">
        <div className="flex justify-between">
            <div className="h-3 w-16 bg-slate-800 rounded"></div>
            <div className="h-4 w-4 bg-slate-800 rounded-full"></div>
        </div>
        <div className="h-7 w-24 bg-slate-800 rounded-lg"></div>
    </div>
);

// 2. Componente de Precio Individual
const PriceCard = ({ title, value, type = 'default' }) => {
    const isAccent = type === 'accent';
    
    return (
        <NeumorphicPanel className="p-4 flex flex-col justify-between h-[90px] group border-white/5 hover:border-[#F76B1C]/20 transition-all">
            <h4 className="text-slate-500 text-[8px] font-black uppercase tracking-widest">{title}</h4>
            <div className="flex items-baseline gap-1">
                <span className={`text-[10px] font-bold ${isAccent ? 'text-[#F76B1C]' : 'text-slate-600'}`}>$</span>
                <span className={`text-xl font-black tabular-nums tracking-tight ${isAccent ? 'text-[#F76B1C]' : 'text-white'}`}>
                    {typeof value === 'number' ? value.toLocaleString('es-AR') : '---'}
                </span>
            </div>
            <p className="text-[7px] font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1">
                <TrendingUp size={8} className="text-emerald-500" /> Venta
            </p>
        </NeumorphicPanel>
    );
};

// 3. Componente Principal
const DolarAPIWidget = () => {
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchRates = async () => {
            try {
                // Usamos la API de DolarAPI
                const response = await fetch('https://dolarapi.com/v1/dolares');
                if (!response.ok) throw new Error('Network response was not ok');
                
                const data = await response.json();
                
                if (isMounted) {
                    // Mapeamos solo los que nos interesan para el dashboard
                    const filtered = {
                        oficial: data.find(d => d.casa === 'oficial'),
                        blue: data.find(d => d.casa === 'blue'),
                        mep: data.find(d => d.casa === 'bolsa'),
                        ccl: data.find(d => d.casa === 'contadoconliqui')
                    };
                    setRates(filtered);
                    setError(false);
                }
            } catch (err) {
                console.error("DolarAPI Error:", err);
                if (isMounted) setError(true);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchRates();
        // Actualizar cada 5 minutos
        const interval = setInterval(fetchRates, 300000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    if (error) {
        return (
            <div className="w-full mb-10 overflow-hidden rounded-[32px] border border-red-500/10 bg-red-500/5 p-6 flex items-center justify-center gap-3">
                <AlertCircle size={20} className="text-red-500/50" />
                <p className="text-[10px] font-black text-red-500/50 uppercase tracking-widest">
                    No se pudo cargar la cotización del dólar en este momento
                </p>
            </div>
        );
    }

    return (
        <div className="w-full mb-10 space-y-4">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F76B1C]/10 flex items-center justify-center text-[#F76B1C]">
                        <DollarSign size={16} />
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-white uppercase tracking-widest">Mercado de Cambios</h3>
                        <p className="text-[9px] text-slate-500 font-bold flex items-center gap-1 uppercase">
                            <Clock size={10} /> Actualización en tiempo real • DolarAPI
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => <WidgetSkeleton key={i} />)
                ) : (
                    <>
                        <PriceCard 
                            title="Dólar Oficial" 
                            value={rates?.oficial?.venta} 
                        />
                        <PriceCard 
                            title="Dólar Blue" 
                            value={rates?.blue?.venta} 
                            type="accent" 
                        />
                        <PriceCard 
                            title="Dólar MEP" 
                            value={rates?.mep?.venta} 
                        />
                        <PriceCard 
                            title="Dólar CCL" 
                            value={rates?.ccl?.venta} 
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default DolarAPIWidget;
