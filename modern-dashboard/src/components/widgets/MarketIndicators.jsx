import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import NeumorphicPanel from '../ui/NeumorphicPanel';

const QuoteCard = ({ quote }) => {
    const { symbol, price, variation, category } = quote;
    const isPositive = variation > 0;
    const isNegative = variation < 0;

    return (
        <div className="flex flex-col p-4 bg-[#12161f] rounded-2xl border border-white/5 hover:border-[#F76B1C]/30 transition-all group">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{symbol}</span>
                <span className="text-[8px] font-bold text-slate-600 uppercase bg-black/30 px-1.5 py-0.5 rounded-md">{category}</span>
            </div>
            <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-white tabular-nums">${price?.toLocaleString('es-AR')}</span>
                <div className={`flex items-center gap-0.5 text-[10px] font-bold ${isPositive ? 'text-emerald-500' : isNegative ? 'text-red-500' : 'text-slate-500'}`}>
                    {isPositive ? <TrendingUp size={10} /> : isNegative ? <TrendingDown size={10} /> : <Minus size={10} />}
                    {variation}%
                </div>
            </div>
        </div>
    );
};

const MarketIndicators = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const { data, error } = await supabase
                    .from('market_quotes')
                    .select('*')
                    .order('category', { ascending: true });
                
                if (error) throw error;
                setQuotes(data || []);
            } catch (err) {
                console.error("Error fetching market quotes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuotes();

        // Suscripción en tiempo real
        const channel = supabase
            .channel('market_quotes_realtime')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'market_quotes' }, (payload) => {
                setQuotes((prev) => {
                    const index = prev.findIndex(q => q.symbol === payload.new.symbol);
                    if (index !== -1) {
                        const newQuotes = [...prev];
                        newQuotes[index] = payload.new;
                        return newQuotes;
                    }
                    return [payload.new, ...prev];
                });
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    if (loading && quotes.length === 0) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8 opacity-50">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (quotes.length === 0) {
        return (
            <div className="w-full mb-8 border border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center opacity-40">
                <Activity size={24} className="text-slate-600 mb-2" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Esperando sincronización de mercado (IOL Sync)...</p>
            </div>
        );
    }

    return (
        <div className="w-full mb-8">
            <div className="flex items-center gap-3 mb-4 px-2">
                <Activity size={14} className="text-[#F76B1C]" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Mercado en Vivo • IOL Sync</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {quotes.map((quote) => (
                    <QuoteCard key={quote.symbol} quote={quote} />
                ))}
            </div>
        </div>
    );
};

export default MarketIndicators;
