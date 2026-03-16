import React, { useState, useEffect, useCallback } from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel.jsx';
import { Activity, TrendingUp, BarChart2, TrendingDown, Minus, Wallet, ShoppingCart, Tag } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { getUserFinancialData, executeTrade } from '../../lib/walletService';

const MarketSimulator = () => {
    const { user } = useAuth();
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [financialData, setFinancialData] = useState({
        wallet: { ars_balance: 0, usd_balance: 0 },
        assets: [],
        history: []
    });
    const [tradeQty, setTradeQty] = useState(1);
    const [processing, setProcessing] = useState(false);

    const refreshData = useCallback(async () => {
        if (!user) return;
        const data = await getUserFinancialData(user.uid, user.email);
        if (data) setFinancialData(data);
    }, [user]);

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
        refreshData();

        const channel = supabase
            .channel('simulator_updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'market_quotes' }, fetchQuotes)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'user_wallets', filter: `id=eq.${user?.uid}` }, refreshData)
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [user, refreshData]);

    const handleTrade = async (ticker, type) => {
        if (!user || processing) return;
        
        setProcessing(true);
        const quote = quotes.find(q => q.symbol === ticker);
        if (!quote) {
            alert("Cotización no encontrada");
            setProcessing(false);
            return;
        }

        const result = await executeTrade(user.uid, {
            ticker,
            type,
            quantity: tradeQty,
            price: quote.price,
            currency: 'ARS' // Por defecto ARS para este simulador
        });

        if (result.success) {
            await refreshData();
        } else {
            alert(`Error: ${result.error}`);
        }
        setProcessing(false);
    };

    const calculatePortfolioValue = () => {
        let assetsValue = 0;
        financialData.assets.forEach(asset => {
            const quote = quotes.find(q => q.symbol === asset.ticker);
            if (quote) assetsValue += quote.price * asset.quantity;
        });
        return (financialData.wallet?.ars_balance || 0) + assetsValue;
    };

    const mainAssets = ['GGAL', 'YPFD', 'PAMP', 'AL30'];

    return (
        <NeumorphicPanel radiance="blue" className="h-full min-h-[500px] flex flex-col p-6">
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
                            Virtual_Wallet: Active
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Portfolio_Equity (ARS)</p>
                    <p className="text-xl font-black text-white italic">
                        ${calculatePortfolioValue().toLocaleString('es-AR')}
                    </p>
                </div>
            </div>

            {/* Trading Controls & Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {mainAssets.map(symbol => {
                    const quote = quotes.find(q => q.symbol === symbol);
                    if (!quote) return null;
                    return (
                        <div key={symbol} className="bg-[#12161f] p-4 rounded-3xl border border-white/5 space-y-3 group hover:border-[#F76B1C]/30 transition-all">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{symbol}</p>
                                    <p className="text-lg font-black text-white">${quote.price?.toLocaleString('es-AR')}</p>
                                </div>
                                <div className={`px-2 py-0.5 rounded-full text-[9px] font-black ${quote.variation > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {quote.variation > 0 ? '+' : ''}{quote.variation}%
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleTrade(symbol, 'BUY')}
                                    disabled={processing}
                                    className="flex-grow flex items-center justify-center gap-2 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-emerald-500/20"
                                >
                                    <ShoppingCart size={12} /> Compra
                                </button>
                                <button 
                                    onClick={() => handleTrade(symbol, 'SELL')}
                                    disabled={processing}
                                    className="flex-grow flex items-center justify-center gap-2 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-rose-500/20"
                                >
                                    <Tag size={12} /> Venta
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Order Configuration Inset */}
            <div className="bg-black/40 rounded-3xl p-4 mb-6 border border-white/5 flex items-center justify-between">
                <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Cantidad de Orden</p>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setTradeQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10">-</button>
                        <span className="text-xl font-black text-white">{tradeQty}</span>
                        <button onClick={() => setTradeQty(q => q + 1)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10">+</button>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Efectivo Disponible</p>
                    <p className="text-sm font-black text-emerald-400">${(financialData.wallet?.ars_balance || 0).toLocaleString('es-AR')}</p>
                </div>
            </div>

            {/* Inset for Active Positions */}
            <div className="flex-grow bg-[#0d1017] rounded-[24px] shadow-inner border border-black/20 p-6 flex flex-col relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                    <Wallet size={14} className="text-slate-500" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Posiciones_en_Cartera</span>
                </div>
                
                <div className="space-y-3 overflow-y-auto max-h-[150px] no-scrollbar">
                    {financialData.assets.length === 0 ? (
                        <p className="text-[10px] text-slate-600 font-bold uppercase text-center py-4">Sin activos operativos</p>
                    ) : (
                        financialData.assets.map((asset) => (
                            <div key={asset.ticker} className="flex justify-between items-center text-[10px] font-bold">
                                <span className="text-white uppercase tracking-widest">{asset.ticker}</span>
                                <span className="text-slate-500">{asset.quantity} units (@ ${asset.average_price?.toLocaleString('es-AR')})</span>
                                <span className="text-[#F76B1C]">
                                    ${((quotes.find(q => q.symbol === asset.ticker)?.price || 0) * asset.quantity).toLocaleString('es-AR')}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                {/* Decorative background grid */}
                <div className="absolute inset-0 [background-size:25px_25px] [background-image:linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] opacity-30 z-[-1]"></div>
            </div>
        </NeumorphicPanel>
    );
};

export default MarketSimulator;

