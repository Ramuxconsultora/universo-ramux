import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

const TickerItem = ({ quote }) => {
    const { symbol, price, variation } = quote;
    const isPositive = variation > 0;
    const isNegative = variation < 0;

    return (
        <div className="flex items-center justify-between px-6 py-4 border-r border-b border-white/5 group hover:bg-white/[0.02] transition-colors last:border-b-0">
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">
                    {symbol}
                </span>
                <span className="text-xs font-black text-white tabular-nums tracking-tight">
                    ${price?.toLocaleString('es-AR')}
                </span>
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-bold ${isPositive ? 'text-emerald-500' : isNegative ? 'text-red-500' : 'text-slate-500'}`}>
                {isPositive ? <TrendingUp size={12} /> : isNegative ? <TrendingDown size={12} /> : <Minus size={12} />}
                {variation}%
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
            <div className="w-full h-10 bg-black/20 border-y border-white/5 flex items-center overflow-hidden">
                <div className="animate-pulse flex gap-8 px-4 w-full">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-3 w-24 bg-white/5 rounded" />
                    ))}
                </div>
            </div>
        );
    }

    if (quotes.length === 0) return null;

    return (
        <div className="w-full bg-black/40 backdrop-blur-md border-y border-white/5 group">
            <div className="flex flex-col lg:flex-row items-stretch">
                {/* Fixed Label - Spans full height on large screens */}
                <div className="flex items-center gap-4 px-8 py-5 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/60 z-10 shrink-0">
                    <Activity size={18} className="text-[#F76B1C]" />
                    <span className="text-xs font-black text-white uppercase tracking-[0.4em]">MERCADO EN VIVO</span>
                </div>
                
                {/* Data Grid: Wraps into 2 lines on desktop if needed, multi-line on mobile */}
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {quotes.map((quote) => (
                        <TickerItem key={quote.symbol} quote={quote} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketIndicators;

