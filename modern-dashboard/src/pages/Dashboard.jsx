import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/layout/Sidebar';
import NewsCard from '../components/feed/NewsCard';
import GlassPanel from '../components/ui/GlassPanel';
import { Newspaper, Users, Terminal, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import MarketSimulator from '../components/widgets/MarketSimulator';
import IAChatWidget from '../components/widgets/IAChatWidget';
import WelcomeHero from '../components/widgets/WelcomeHero';
import BCRAWidgets from '../components/widgets/BCRAWidgets';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('news');
    const [activeScope, setActiveScope] = useState('Nacional');
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
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-300"></div>
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

                    {/* BCRA Financial Data Widgets */}
                    <BCRAWidgets />

                    {/* Top Widgets Grid (Just IA Chat now since MarketSimulator moved to Sidebar) */}
                    <div className="mb-6">
                        <IAChatWidget />
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex gap-6">
                            <button
                                onClick={() => setActiveTab('news')}
                                className={`text-xl font-bold pb-4 -mb-4 transition-colors flex items-center gap-2 ${activeTab === 'news' ? 'text-white border-b-2 border-sky-400' : 'text-slate-500 hover:text-white'}`}
                            >
                                <Newspaper size={20} /> Noticias
                            </button>
                            <button
                                onClick={() => setActiveTab('community')}
                                className={`text-xl font-bold pb-4 -mb-4 transition-colors flex items-center gap-2 ${activeTab === 'community' ? 'text-white border-b-2 border-sky-400' : 'text-slate-500 hover:text-white'}`}
                            >
                                <Users size={20} /> Comunidad
                            </button>
                        </div>
                    </div>


                    {/* Content Area */}
                    <div className="space-y-8 animate-fade-in">
                        {activeTab === 'news' && (
                            <div className="space-y-6">
                                {/* Scope Filters */}
                                <div className="flex justify-center gap-4 mb-8">
                                    <button
                                        onClick={() => setActiveScope('Nacional')}
                                        className={`px-6 py-2 rounded-full font-bold transition-all text-sm uppercase tracking-wider ${activeScope === 'Nacional' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                                    >
                                        {t('Nacional')}
                                    </button>
                                    <button
                                        onClick={() => setActiveScope('Internacional')}
                                        className={`px-6 py-2 rounded-full font-bold transition-all text-sm uppercase tracking-wider ${activeScope === 'Internacional' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                                    >
                                        {t('Internacional')}
                                    </button>
                                </div>

                                {/* Error State */}
                                {errorMsg && (
                                    <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-lg mb-4">
                                        <h4 className="font-bold">Error de Conexión</h4>
                                        <p className="text-sm">{errorMsg}</p>
                                    </div>
                                )}

                                {news.length === 0 && !loading ? (
                                    <div className="text-center p-10 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                        <p className="text-slate-400">No hay noticias disponibles en este momento.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                                        {/* Economy Column */}
                                        <div className="bg-slate-900/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
                                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                                <h2 className="text-sm font-mono tracking-widest text-slate-300 uppercase">{t('Economía, Mercado y Finanzas')}</h2>
                                            </div>

                                            <div className="space-y-3 pl-2">
                                                {news
                                                    .filter(item => item.scope === activeScope && (item.category === 'Economía' || item.category.includes('Economía')))
                                                    .map((item) => (
                                                        <NewsCard key={item.id} item={item} />
                                                    ))}
                                            </div>
                                        </div>

                                        {/* Technology Column */}
                                        <div className="bg-slate-900/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
                                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                                                <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></div>
                                                <h2 className="text-sm font-mono tracking-widest text-slate-300 uppercase">{t('Tecnología e Innovación')}</h2>
                                            </div>

                                            <div className="space-y-3 pl-2">
                                                {news
                                                    .filter(item => item.scope === activeScope && (item.category === 'Tecnología' || item.category.includes('Tecnología') || item.category.includes('IA')))
                                                    .map((item) => (
                                                        <NewsCard key={item.id} item={item} />
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}

                        {activeTab === 'community' && (
                            <GlassPanel className="p-12 text-center border-dashed border-slate-700">
                                <Users size={48} className="mx-auto text-slate-600 mb-4" />
                                <h3 className="text-xl font-bold text-white">Comunidad en Mantenimiento</h3>
                                <p className="text-slate-400 mt-2">Estamos actualizando el feed de la comunidad.</p>
                            </GlassPanel>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Sidebar (4 cols) */}
                <div className="order-1 lg:order-2 lg:col-span-4">
                    <Sidebar />
                </div>

            </div>
        </Layout>
    );
}

export default Dashboard;
