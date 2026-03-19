import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, History, ArrowUpRight, ArrowDownLeft, X } from 'lucide-react';
import { redeemCode, transferFunds } from '../../lib/walletService';
import { useAuth } from '../../contexts/AuthContext';
import GlassPanel from '../ui/GlassPanel';

const WalletSection = ({ balance = "0,00", usdBalance = "0,00", rmxBalance = "0,00", roiChange = "+0.0%", history = [] }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showRedeemModal, setShowRedeemModal] = React.useState(false);
    const [showTransferModal, setShowTransferModal] = React.useState(false);
    const [promoCode, setPromoCode] = React.useState('');
    const [transferData, setTransferData] = React.useState({ email: '', amount: '', currency: 'ARS' });
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState({ text: '', type: '' });

    const defaultHistory = [
        { id: 1, type: 'gain', amount: '+50 RMX', label: 'Bienvenida', date: 'Hoy' },
    ];

    const currentHistory = history.length > 0 ? history : defaultHistory;

    const handleRedeem = async () => {
        if (!promoCode) return;
        setLoading(true);
        const res = await redeemCode(user.uid, promoCode);
        setLoading(false);
        setMessage({ text: res.message || res.error, type: res.success ? 'success' : 'error' });
        if (res.success) {
            setPromoCode('');
            setTimeout(() => {
                setShowRedeemModal(false);
                window.location.reload();
            }, 2000);
        }
    };

    const handleTransfer = async () => {
        if (!transferData.email || !transferData.amount) return;
        setLoading(true);
        const res = await transferFunds(user.uid, transferData.email, transferData.amount, transferData.currency);
        setLoading(false);
        setMessage({ text: res.message || res.error, type: res.success ? 'success' : 'error' });
        if (res.success) {
            setTransferData({ email: '', amount: '', currency: 'ARS' });
            setTimeout(() => {
                setShowTransferModal(false);
                window.location.reload();
            }, 2000);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up relative" style={{ animationDelay: '0.1s' }}>
            
            {/* Wallet & Balance Card */}
            <GlassPanel className="p-8 lg:p-10 relative overflow-hidden group border-white/10 flex flex-col justify-between min-h-[400px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F76B1C]/5 blur-3xl group-hover:bg-[#F76B1C]/10 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/5 blur-3xl group-hover:bg-sky-500/10 transition-all duration-700" />
                
                <div className="relative z-10 flex-grow flex flex-col justify-center space-y-10 py-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
                        <div className="space-y-6 flex-grow min-w-0 w-full text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                                <div className="p-2.5 rounded-xl bg-[#F76B1C]/10 border border-[#F76B1C]/20 shadow-[0_0_20px_rgba(247,107,28,0.1)]">
                                    <Wallet size={20} className="text-[#F76B1C]" />
                                </div>
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Mi Wallet</h3>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="group/balance">
                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest ml-1 mb-1">Saldo Disponible ARS</p>
                                    <h4 
                                        className="font-black text-white tracking-tight italic leading-none whitespace-nowrap transition-all"
                                        style={{ fontSize: 'clamp(1rem, 7vw, 2.2rem)' }}
                                    >
                                        ${balance}
                                    </h4>
                                </div>
                                
                                <div className="group/balance">
                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest ml-1 mb-1">Saldo Disponible USD</p>
                                    <h4 
                                        className="font-black text-emerald-400 tracking-tight italic leading-none whitespace-nowrap transition-all"
                                        style={{ fontSize: 'clamp(0.9rem, 6vw, 1.8rem)' }}
                                    >
                                        u$s {usdBalance}
                                    </h4>
                                </div>

                                <div className="group/balance pt-2 border-t border-white/5">
                                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                        <p className="text-[9px] text-amber-500 font-black uppercase tracking-widest">Saldo RMX (Gold Pegged)</p>
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                                    </div>
                                    <h4 
                                        className="font-black text-amber-500 tracking-tight italic leading-none whitespace-nowrap transition-all"
                                        style={{ fontSize: 'clamp(1.1rem, 8vw, 2.5rem)' }}
                                    >
                                        {rmxBalance || "0,00"} <span className="text-[10px] not-italic opacity-70 ml-1">RMX</span>
                                    </h4>
                                    <p className="text-[8px] text-slate-600 font-bold uppercase tracking-[0.2em] mt-2">1 RMX = 1 Oz Oro Spot</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-full sm:w-auto shrink-0">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md text-center">
                                <p className="text-emerald-400 font-black text-2xl lg:text-3xl leading-none">{roiChange}</p>
                                <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2">Profit ROI</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
                    <button 
                        onClick={() => setShowRedeemModal(true)}
                        className="sm:col-span-1 bg-[#F76B1C] hover:bg-orange-500 text-white font-black py-4 px-4 rounded-xl text-[9px] uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/20 flex flex-col items-center justify-center gap-1 group/btn"
                    >
                        <span className="opacity-70 group-hover/btn:opacity-100 transition-opacity">Canjear</span>
                        <span className="text-[10px]">Código</span>
                    </button>
                    
                    <button 
                        onClick={() => setShowTransferModal(true)}
                        className="bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-xl text-[9px] uppercase tracking-[0.2em] transition-all border border-white/10 flex flex-col items-center justify-center gap-1 hover:border-white/20"
                    >
                        <span className="opacity-70">Acción</span>
                        <span className="text-[10px]">Transferir</span>
                    </button>
                    
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 font-black py-4 rounded-xl text-[9px] uppercase tracking-[0.2em] transition-all border border-sky-500/20 flex flex-col items-center justify-center gap-1 hover:border-sky-500/40"
                    >
                        <span className="opacity-70">Mercado</span>
                        <span className="text-[10px]">Operar</span>
                    </button>
                </div>
            </GlassPanel>

            {/* Transaction History Card */}
            <GlassPanel className="p-8 lg:p-10 flex flex-col border-white/5 min-h-[400px]">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                            <History size={18} className="text-slate-400" />
                        </div>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Historial Reciente</h4>
                    </div>
                    <button className="text-[9px] font-black text-sky-400 uppercase tracking-widest hover:text-sky-300 transition-colors bg-sky-500/5 px-3 py-1.5 rounded-lg border border-sky-500/10">
                        Ver Todo
                    </button>
                </div>

                <div className="flex-grow space-y-3 overflow-y-auto max-h-[280px] pr-2 no-scrollbar">
                    {currentHistory.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 opacity-30 text-center">
                            <History size={40} className="mb-4 text-slate-600" />
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sin movimientos registrados</p>
                        </div>
                    ) : (
                        currentHistory.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/[0.03] hover:bg-white/[0.08] transition-all group/item hover:border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${item.type === 'gain' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                        {item.type === 'gain' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-black text-white uppercase tracking-tight truncate">{item.label}</p>
                                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{item.date}</p>
                                    </div>
                                </div>
                                <p className={`text-xs font-black font-mono shrink-0 ml-4 ${item.type === 'gain' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {item.amount}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </GlassPanel>

            {/* Modals Overlay */}
            {(showRedeemModal || showTransferModal) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { setShowRedeemModal(false); setShowTransferModal(false); setMessage({text:'', type:''}); }} />
                    
                    <GlassPanel className="w-full max-w-md p-8 relative z-10 border-white/20 animate-in zoom-in-95 duration-200 shadow-2xl">
                        <button 
                            onClick={() => { setShowRedeemModal(false); setShowTransferModal(false); setMessage({text:'', type:''}); }}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {showRedeemModal ? (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h5 className="text-2xl font-black text-white italic uppercase tracking-tighter">Canjear Código</h5>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-balance">Ingresa el código secreto proporcionado por el Founder para acreditar fondos.</p>
                                </div>
                                <div className="space-y-4">
                                    <input 
                                        type="text" 
                                        placeholder="EJ: REGALO_RMX_2026"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm font-black focus:border-[#F76B1C] outline-none transition-all placeholder:text-slate-700 uppercase"
                                    />
                                    {message.text && (
                                        <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'} text-[10px] font-black uppercase text-center transition-all animate-in fade-in slide-in-from-top-1`}>
                                            {message.text}
                                        </div>
                                    )}
                                </div>
                                <button 
                                    disabled={loading || !promoCode}
                                    onClick={handleRedeem}
                                    className="w-full bg-[#F76B1C] text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-orange-500 disabled:opacity-50 transition-all shadow-lg shadow-orange-500/20"
                                >
                                    {loading ? 'Validando...' : 'Confirmar Canje'}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h5 className="text-2xl font-black text-white italic uppercase tracking-tighter">Transferencia P2P</h5>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Transfiere saldo de forma instantánea a otro usuario.</p>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1 text-left">Email del destinatario</p>
                                        <input 
                                            type="email" 
                                            placeholder="ejemplo@ramux.com"
                                            value={transferData.email}
                                            onChange={(e) => setTransferData({...transferData, email: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm font-bold focus:border-sky-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-grow">
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1 text-left">Monto</p>
                                            <input 
                                                type="number" 
                                                placeholder="0.00"
                                                value={transferData.amount}
                                                onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm font-bold focus:border-sky-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1 text-left">Divisa</p>
                                            <select 
                                                value={transferData.currency}
                                                onChange={(e) => setTransferData({...transferData, currency: e.target.value})}
                                                className="h-[52px] bg-black/40 border border-white/10 rounded-xl px-4 text-white text-xs font-black focus:border-sky-500 outline-none"
                                            >
                                                <option value="ARS">ARS</option>
                                                <option value="USD">USD</option>
                                            </select>
                                        </div>
                                    </div>
                                    {message.text && (
                                        <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'} text-[10px] font-black uppercase text-center transition-all animate-in fade-in slide-in-from-top-1`}>
                                            {message.text}
                                        </div>
                                    )}
                                </div>
                                <button 
                                    disabled={loading || !transferData.email || !transferData.amount}
                                    onClick={handleTransfer}
                                    className="w-full bg-sky-500 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-sky-600 disabled:opacity-50 transition-all shadow-lg shadow-sky-500/20"
                                >
                                    {loading ? 'Procesando Envío...' : 'Enviar Fondos'}
                                </button>
                            </div>
                        )}
                    </GlassPanel>
                </div>
            )}
        </div>
    );
};

export default WalletSection;
