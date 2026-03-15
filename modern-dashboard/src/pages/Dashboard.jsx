import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/layout/Sidebar';
import NewsCard from '../components/feed/NewsCard';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import { useNavigate } from 'react-router-dom';
import { Newspaper, Users, Terminal, RefreshCw, Activity, Cpu, ArrowRight, Scale } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import MarketSimulator from '../components/widgets/MarketSimulator';
import IAChatWidget from '../components/widgets/IAChatWidget';
import WelcomeHero from '../components/widgets/WelcomeHero';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('news');
    const [activeScope, setActiveScope] = useState('Nacional');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [news, setNews] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSpinning, setIsSpinning] = useState(false);

    useEffect(() => {
        // 1. Initial Fetch
        const fetchNews = async () => {
            try {
                console.log("Fetching news from Supabase...");
                const { data, error } = await supabase
                    .from('noticias')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Supabase Error:', error);
                    setErrorMsg(error.message);
                } else if (data) {
                    console.log("News fetched successfully:", data);
                    setNews(data);
                } else {
                    console.warn("No data returned from Supabase.");
                }
            } catch (err) {
                console.error("Unexpected error:", err);
                setErrorMsg(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();

        // 2. Real-time Subscription
        const channel = supabase
            .channel('public:noticias')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'noticias' }, (payload) => {
                console.log('New news received:', payload.new);
                setNews((prev) => [payload.new, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const featured = news && news.length > 0 ? news[0] : null;
    const listItems = news && news.length > 1 ? news.slice(1) : [];

    // Handle loading state
    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT COLUMN: Feed (8 cols) */}
                <div className="order-2 lg:order-1 lg:col-span-8 space-y-8">

                    {/* Welcome Hero */}
                    <WelcomeHero />

                    {/* Featured Opinion Analysis */}
                    <NeumorphicPanel 
                        className="group p-6 md:p-8 bg-gradient-to-br from-[#1c2230] to-[#12161f] border-l-4 border-[#F76B1C] cursor-pointer hover:translate-y-[-2px] transition-all duration-500 overflow-hidden relative"
                        onClick={() => navigate('/opinion/laboral')}
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F76B1C]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#F76B1C]/10 transition-colors duration-700" />
                        
                        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                            <div className="flex-grow space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-[#F76B1C]/10 rounded-full border border-[#F76B1C]/20 text-[9px] font-black text-[#F76B1C] uppercase tracking-widest">Opinión y Coyuntura</span>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">15 MAR 2026</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black text-white italic leading-tight tracking-tight group-hover:text-[#F76B1C] transition-colors">
                                    La Nueva Era del Trabajo en Argentina
                                </h2>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl line-clamp-2">
                                    Análisis técnico sobre la Ley de Modernización Laboral. Desglosamos el cambio de paradigma estructural hacia un esquema de flexibilidad y reducción de barreras.
                                </p>
                            </div>
                            <div className="shrink-0">
                                <div className="flex items-center gap-3 px-6 py-3 bg-[#F76B1C] text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(247,107,28,0.3)] group-hover:shadow-[0_0_40px_rgba(247,107,28,0.5)] group-hover:scale-105 transition-all">
                                    Leer Análisis
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </NeumorphicPanel>


                    {/* Top Widgets Grid (Just IA Chat now since MarketSimulator moved to Sidebar) */}
                    <div className="mb-6">
                        <IAChatWidget />
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center justify-start gap-8 border-b border-white/5 pb-4">
                        <button
                            onClick={() => setActiveTab('news')}
                            className={`text-lg font-bold pb-2 transition-all relative ${activeTab === 'news' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <span className="flex items-center gap-2">
                                <Newspaper size={18} /> Noticias
                            </span>
                            {activeTab === 'news' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F76B1C] rounded-full shadow-[0_0_10px_#F76B1C]" />}
                        </button>
                        <button
                            onClick={() => setActiveTab('community')}
                            className={`text-lg font-bold pb-2 transition-all relative ${activeTab === 'community' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <span className="flex items-center gap-2">
                                <Users size={18} /> Comunidad
                            </span>
                            {activeTab === 'community' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F76B1C] rounded-full shadow-[0_0_10px_#F76B1C]" />}
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-6">
                        {activeTab === 'news' && (
                            <div className="space-y-6">
                                {/* Scope Filters - Neumorphic Style */}
                                <div className="flex justify-start gap-4 mb-4">
                                    <div className="flex bg-[#12161f] p-1.5 rounded-2xl shadow-inner border border-black/10">
                                        <button
                                            onClick={() => setActiveScope('Nacional')}
                                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeScope === 'Nacional' ? 'bg-[#F76B1C] text-white shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
                                        >
                                            {t('Nacional')}
                                        </button>
                                        <button
                                            onClick={() => setActiveScope('Internacional')}
                                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeScope === 'Internacional' ? 'bg-[#F76B1C] text-white shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
                                        >
                                            {t('Internacional')}
                                        </button>
                                    </div>
                                </div>

                                {/* Error State */}
                                {errorMsg && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-3xl font-bold text-sm shadow-inner">
                                        [!] Error de conexión: {errorMsg}
                                    </div>
                                )}

                                {news.length === 0 && !loading ? (
                                    <NeumorphicPanel className="p-16 text-center">
                                        <p className="text-slate-500 font-bold text-sm uppercase italic">Sin datos disponibles en este momento</p>
                                    </NeumorphicPanel>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                                        {/* Economy Bento Box */}
                                        <NeumorphicPanel className="p-8 flex flex-col h-full bg-gradient-to-br from-[#1c2230] to-[#181d27]">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="p-2.5 bg-sky-500/10 rounded-xl">
                                                    <Activity className="text-sky-400" size={18} />
                                                </div>
                                                <h2 className="text-sm font-bold tracking-wide text-white uppercase">{t('Economy & Finance')}</h2>
                                            </div>

                                            <div className="space-y-1 flex-grow">
                                                {news
                                                    .filter(item => item.scope === activeScope && (item.category === 'Economía' || item.category.includes('Economía')))
                                                    .map((item) => (
                                                        <NewsCard key={item.id} item={item} />
                                                    ))}
                                            </div>
                                        </NeumorphicPanel>

                                        {/* Technology Bento Box */}
                                        <NeumorphicPanel className="p-8 flex flex-col h-full bg-gradient-to-br from-[#1c2230] to-[#181d27]">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="p-2.5 bg-orange-500/10 rounded-xl">
                                                    <Cpu className="text-orange-400" size={18} />
                                                </div>
                                                <h2 className="text-sm font-bold tracking-wide text-white uppercase">{t('Tech & Innovation')}</h2>
                                            </div>

                                            <div className="space-y-1 flex-grow">
                                                {news
                                                    .filter(item => item.scope === activeScope && (item.category === 'Tecnología' || item.category.includes('Tecnología') || item.category.includes('IA')))
                                                    .map((item) => (
                                                        <NewsCard key={item.id} item={item} />
                                                    ))}
                                            </div>
                                        </NeumorphicPanel>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'community' && (
                            <NeumorphicPanel className="p-20 text-center">
                                <div className="w-20 h-20 bg-[#12161f] rounded-3xl shadow-inner border border-black/10 flex items-center justify-center mx-auto mb-6">
                                    <Users size={32} className="text-sky-500/50" />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Módulo en Desarrollo</h3>
                                <p className="text-slate-500 mt-3 max-w-sm mx-auto">Estamos construyendo el feed de comunidad. Pronto podrás interactuar con otros usuarios.</p>
                            </NeumorphicPanel>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Sidebar (4 cols) - Centrado y alineado con Hero */}
                <div className="order-1 lg:order-2 lg:col-span-4 sticky top-28">
                    <Sidebar />
                </div>

            </div>
        </Layout>
    );
}

export default Dashboard;
