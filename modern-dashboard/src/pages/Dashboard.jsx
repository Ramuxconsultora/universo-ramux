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
    const [activeCategory, setActiveCategory] = useState('all');
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

                {/* LEFT COLUMN: Feed (9 cols) */}
                <div className="order-2 lg:order-1 lg:col-span-9 space-y-12">

                    {/* Welcome Hero */}
                    <WelcomeHero />

                    {/* Featured Opinion Analysis */}
                    <NeumorphicPanel 
                        className="group p-6 md:p-10 bg-gradient-to-br from-[#1c2230] to-[#12161f] border-l-4 border-[#F76B1C] cursor-pointer hover:translate-y-[-2px] transition-all duration-500 overflow-hidden relative"
                        onClick={() => navigate('/opinion/laboral')}
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F76B1C]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#F76B1C]/10 transition-colors duration-700" />
                        
                        <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                            <div className="flex-grow space-y-5">
                                <div className="flex items-center gap-4">
                                    <span className="px-4 py-1.5 bg-[#F76B1C]/10 rounded-full border border-[#F76B1C]/20 text-[10px] font-black text-[#F76B1C] uppercase tracking-[0.3em]">Opinión y Coyuntura</span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">15 MAR 2026</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white italic leading-[1.1] tracking-tighter group-hover:text-[#F76B1C] transition-colors">
                                    La Nueva Era del Trabajo <br/> en Argentina
                                </h2>
                                <p className="text-base text-slate-400 font-medium leading-relaxed max-w-3xl line-clamp-2">
                                    Análisis técnico sobre la Ley de Modernización Laboral. Desglosamos el cambio de paradigma estructural hacia un esquema de flexibilidad y reducción de barreras.
                                </p>
                            </div>
                            <div className="shrink-0">
                                <div className="flex items-center gap-3 px-8 py-4 bg-[#F76B1C] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(247,107,28,0.3)] group-hover:shadow-[0_0_40px_rgba(247,107,28,0.5)] group-hover:scale-105 transition-all">
                                    Leer Análisis
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </NeumorphicPanel>


                    {/* Top Widgets Grid */}
                    <div className="mb-10">
                        <IAChatWidget />
                    </div>

                    {/* Restyled Tabs & Filters Header */}
                    <div className="flex flex-col gap-8 border-b border-white/5 pb-10 mb-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-10">
                                <button
                                    onClick={() => setActiveTab('news')}
                                    className={`text-4xl lg:text-7xl font-black transition-all relative uppercase italic tracking-tighter ${activeTab === 'news' ? 'text-white' : 'text-slate-700 hover:text-slate-500'}`}
                                >
                                    Noticias
                                    {activeTab === 'news' && <div className="absolute -bottom-2 left-0 w-1/2 h-2.5 bg-[#F76B1C] rounded-full shadow-[0_0_20px_#F76B1C]" />}
                                </button>
                                <button
                                    onClick={() => setActiveTab('community')}
                                    className={`text-2xl lg:text-3xl font-black transition-all relative uppercase italic tracking-tighter mt-2 ${activeTab === 'community' ? 'text-white' : 'text-slate-700 hover:text-slate-500'}`}
                                >
                                    Comunidad
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em]">Inteligencia Estratégica en tiempo real</p>
                        </div>

                        {activeTab === 'news' && (
                            <div className="space-y-6">
                                {/* Row 1: Scope Filters */}
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex bg-[#0a0e1a] p-1.5 rounded-[22px] shadow-2xl border border-white/5 ring-1 ring-white/10">
                                        <button
                                            onClick={() => setActiveScope('Nacional')}
                                            className={`px-8 py-2.5 rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeScope === 'Nacional' ? 'bg-[#F76B1C] text-white shadow-lg shadow-orange-500/20' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}
                                        >
                                            Nacional
                                        </button>
                                        <button
                                            onClick={() => setActiveScope('Internacional')}
                                            className={`px-8 py-2.5 rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeScope === 'Internacional' ? 'bg-[#F76B1C] text-white shadow-lg shadow-orange-500/20' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}
                                        >
                                            Internacional
                                        </button>
                                    </div>
                                    <div className="h-4 w-[1px] bg-white/10 mx-2 hidden md:block" />
                                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest hidden md:block">Seleccionar Ámbito</span>
                                </div>

                                {/* Row 2: Category Filter Selector */}
                                <div className="flex flex-wrap gap-3 items-center">
                                    <button
                                        onClick={() => setActiveCategory('all')}
                                        className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${activeCategory === 'all' ? 'bg-white text-black border-white' : 'bg-transparent text-slate-500 border-white/10 hover:border-white/20 hover:text-white'}`}
                                    >
                                        Todas
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory('economy')}
                                        className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${activeCategory === 'economy' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : 'bg-transparent text-slate-500 border-white/10 hover:border-sky-500/20 hover:text-sky-400'}`}
                                    >
                                        Economy & Finance
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory('tech')}
                                        className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${activeCategory === 'tech' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-transparent text-slate-500 border-white/10 hover:border-orange-500/20 hover:text-orange-400'}`}
                                    >
                                        Tech & Innovation
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="space-y-12">
                        {activeTab === 'news' && (
                            <div className="space-y-16">
                                {/* Error State */}
                                {errorMsg && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-8 rounded-[32px] font-black text-sm uppercase tracking-widest text-center">
                                        [!] Error de conexión: {errorMsg}
                                    </div>
                                )}

                                {news.length === 0 && !loading ? (
                                    <NeumorphicPanel className="p-20 text-center bg-[#1c2230]/50">
                                        <p className="text-slate-500 font-black text-xs uppercase tracking-[0.5em] italic">Sin datos disponibles en este momento</p>
                                    </NeumorphicPanel>
                                ) : (
                                    <div className="space-y-16">
                                        {/* Economy Category Section */}
                                        {(activeCategory === 'all' || activeCategory === 'economy') && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className="h-[1px] flex-grow bg-white/5" />
                                                    <div className="flex items-center gap-3 px-6 py-2 bg-sky-500/10 rounded-full border border-sky-500/20">
                                                        <Activity className="text-sky-400" size={16} />
                                                        <h2 className="text-[10px] font-black tracking-[0.3em] text-white uppercase italic">Economy & Finance</h2>
                                                    </div>
                                                    <div className="h-[1px] flex-grow bg-white/5" />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {news
                                                        .filter(item => item.scope === activeScope && (item.category === 'Economía' || item.category.includes('Economía')))
                                                        .map((item) => (
                                                            <NewsCard key={item.id} item={item} />
                                                        ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Technology Category Section */}
                                        {(activeCategory === 'all' || activeCategory === 'tech') && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className="h-[1px] flex-grow bg-white/5" />
                                                    <div className="flex items-center gap-3 px-6 py-2 bg-orange-500/10 rounded-full border border-orange-500/20">
                                                        <Cpu className="text-orange-400" size={16} />
                                                        <h2 className="text-[10px] font-black tracking-[0.3em] text-white uppercase italic">Tech & Innovation</h2>
                                                    </div>
                                                    <div className="h-[1px] flex-grow bg-white/5" />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {news
                                                        .filter(item => item.scope === activeScope && (item.category === 'Tecnología' || item.category.includes('Tecnología') || item.category.includes('IA')))
                                                        .map((item) => (
                                                            <NewsCard key={item.id} item={item} />
                                                        ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'community' && (
                            <NeumorphicPanel className="p-20 text-center bg-[#1c2230]/50 border-white/5">
                                <div className="w-24 h-24 bg-[#0a0e1a] rounded-[32px] shadow-2xl border border-white/10 flex items-center justify-center mx-auto mb-8 ring-1 ring-white/5">
                                    <Users size={40} className="text-sky-500/30" />
                                </div>
                                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-4">Módulo en Desarrollo</h3>
                                <p className="text-slate-500 text-sm font-medium max-w-sm mx-auto leading-relaxed">Estamos construyendo el tejido social de la plataforma. Pronto podrás conectar con otros usuarios.</p>
                            </NeumorphicPanel>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Sidebar (3 cols) */}
                <div className="order-1 lg:order-2 lg:col-span-3 sticky top-28">
                    <Sidebar />
                </div>

            </div>
        </Layout>
    );
}

export default Dashboard;
