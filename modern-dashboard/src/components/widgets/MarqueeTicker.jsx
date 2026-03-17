import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MarqueeTicker = () => {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        const fetchQuotes = async () => {
            const { data } = await supabase.from('market_quotes').select('*');
            if (data) setQuotes(data);
        };
        fetchQuotes();

        const channel = supabase
            .channel('marquee_sync')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'market_quotes' }, fetchQuotes)
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    if (quotes.length === 0) return null;

    return (
        <div className="w-full bg-[#F76B1C] py-1 shadow-[0_0_15px_rgba(247,107,28,0.3)] overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
                {/* Duplicate for seamless loop */}
                {[...quotes, ...quotes, ...quotes].map((quote, idx) => (
                    <div key={`${quote.symbol}-${idx}`} className="inline-flex items-center gap-2 px-8 border-r border-white/20">
                        <span className="text-[9px] font-black text-white/70 uppercase tracking-widest">{quote.symbol}</span>
                        <span className="text-[10px] font-extrabold text-white italic">${quote.price?.toLocaleString('es-AR')}</span>
                        <div className={`flex items-center gap-1 text-[8px] font-black ${quote.variation > 0 ? 'text-white' : quote.variation < 0 ? 'text-black/60' : 'text-white/40'}`}>
                            {quote.variation > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            {quote.variation}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarqueeTicker;
