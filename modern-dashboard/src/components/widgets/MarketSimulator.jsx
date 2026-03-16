import React, { useState, useEffect } from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
import { Activity, TrendingUp, BarChart2, TrendingDown, Minus, Wallet } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const MarketSimulator = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [portfolio, setPortfolio] = useState({
        cash: 1000000,
        assets: {
            'GGAL': 100,
            'AL30': 500
        }
    });

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const { data, error } = await supabase
                    .from('market_quotes')
                    .select('*');
                if (error) throw error;
                setQuotes(data || []);
            } catch (err) {
                console.error("Error fetching quotes for simulator:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuotes();
        const channel = supabase
            .channel('simulator_updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'market_quotes' }, fetchQuotes)
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    const calculatePortfolioValue = () => {
        let assetsValue = 0;
        Object.entries(portfolio.assets).forEach(([symbol, amount]) => {
            const quote = quotes.find(q => q.symbol === symbol);
            if (quote) assetsValue += quote.price * amount;
        });
        return portfolio.cash + assetsValue;
    };

    const ggalQuote = quotes.find(q => q.symbol === 'GGAL');
    const al30Quote = quotes.find(q => q.symbol === 'AL30');

    return (
        <NeumorphicPanel radiance="blue" className="h-full min-h-[400px] flex flex-col p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F76B1C]/10 flex items-center justify-center shadow-inner border border-[#F76B1C]/10">
                        <Activity className="text-[#F76B1C]" size={24} />
                    </div>
                    <div>
                        <h3 className="font-extrabold text-white text-xl tracking-tight">Estrategia & Simulación</h3>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-[#F76B1C] uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F76B1C] animate-pulse"></span>
                            Live_Market_Data: Active
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Portfolio_Value</p>
                    <p className="text-xl font-black text-white italic">
                        ${calculatePortfolioValue().toLocaleString('es-AR')}
                    </p>
                </div>
            </div>

            {/* Metrics Inset */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                {ggalQuote ? (
                    <div className="bg-[#12161f] p-5 rounded-[24px] shadow-inner border border-black/10">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">{ggalQuote.symbol}_Live</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-white">${ggalQuote.price?.toLocaleString('es-AR')}</span>
                            {ggalQuote.variation > 0 ? <TrendingUp size={16} className="text-emerald-500" /> : <TrendingDown size={16} className="text-red-500" />}
                        </div>
                        <p className={`text-[10px] mt-1 font-bold ${ggalQuote.variation > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {ggalQuote.variation > 0 ? '+' : ''}{ggalQuote.variation}% (IOL)
                        </p>
                    </div>
                ) : <div className="h-24 bg-white/5 rounded-[24px] animate-pulse" />}

                {al30Quote ? (
                    <div className="bg-[#12161f] p-5 rounded-[24px] shadow-inner border border-black/10">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">{al30Quote.symbol}_Core</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-white">${al30Quote.price?.toLocaleString('es-AR')}</span>
                            {al30Quote.variation > 0 ? <TrendingUp size={16} className="text-[#F76B1C]" /> : <TrendingDown size={16} className="text-red-500" />}
                        </div>
                        <p className={`text-[10px] mt-1 font-bold ${al30Quote.variation > 0 ? 'text-[#F76B1C]' : 'text-red-500'}`}>
                            {al30Quote.variation > 0 ? '+' : ''}{al30Quote.variation}% (IOL)
                        </p>
                    </div>
                ) : <div className="h-24 bg-white/5 rounded-[24px] animate-pulse" />}
            </div>

            {/* Visualizer Area (Deep Inset) */}
            <div className="flex-grow bg-[#0d1017] rounded-[24px] shadow-inner border border-black/20 p-6 flex flex-col relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                    <Wallet size={14} className="text-slate-500" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Posiciones_Activas</span>
                </div>
                
                <div className="space-y-3">
                    {Object.entries(portfolio.assets).map(([symbol, count]) => (
                        <div key={symbol} className="flex justify-between items-center text-[11px] font-bold">
                            <span className="text-white uppercase tracking-widest">{symbol}</span>
                            <span className="text-slate-500">{count} unidades</span>
                            <span className="text-[#F76B1C]">
                                ${((quotes.find(q => q.symbol === symbol)?.price || 0) * count).toLocaleString('es-AR')}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/5">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Cash_Liquidity</span>
                    <span className="text-xs font-black text-emerald-500">${portfolio.cash.toLocaleString('es-AR')}</span>
                </div>

                {/* Decorative background grid */}
                <div className="absolute inset-0 [background-size:25px_25px] [background-image:linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] opacity-30 z-[-1]"></div>
            </div>
        </NeumorphicPanel>
    );
};

export default MarketSimulator;

