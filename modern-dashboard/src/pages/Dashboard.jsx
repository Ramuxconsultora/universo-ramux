import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Filter, Globe, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Cambiado a ../lib/supabase para consistencia

// Components
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUserFinancialData, getUserProgress } from '../lib/walletService';
import Layout from '../components/layout/Layout.jsx';
import NewsCard from '../components/feed/NewsCard.jsx';
import NeumorphicPanel from '../components/ui/NeumorphicPanel.jsx';
import IAChatWidget from '../components/widgets/IAChatWidget.jsx';
import WelcomeHero from '../components/widgets/WelcomeHero.jsx';
import DolarAPIWidget from '../components/widgets/DolarAPIWidget.jsx';
import MarketIndicators from '../components/widgets/MarketIndicators.jsx';
import MarketSimulator from '../components/widgets/MarketSimulator.jsx';
import MarqueeTicker from '../components/widgets/MarqueeTicker.jsx';
import PortfolioPieChart from '../components/widgets/PortfolioPieChart.jsx';
import EducationWidget from '../components/widgets/EducationWidget.jsx';
import TradingViewChart from '../components/widgets/TradingViewChart.jsx';
import ErrorBoundary from '../components/ui/ErrorBoundary.jsx';

function Dashboard() {
    const { user } = useAuth();
    const [activeScope, setActiveScope] = useState('Todos');
    const [activeCategory, setActiveCategory] = useState('Todas');
    const navigate = useNavigate();

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [financialData, setFinancialData] = useState(null);
    const [academicProgress, setAcademicProgress] = useState([]);
    const [quotes, setQuotes] = useState([]);

    const categories = [
        'Todas',
        'Finanzas y Mercado',
        'Legales',
        'Recursos Humanos',
        'Tecnología e Innovación',
        'Economía'
    ];

    useEffect(() => {
        if (!user) return;

        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [newsRes, finRes, progRes, quotesRes] = await Promise.all([
                    supabase.from('noticias').select('*').order('created_at', { ascending: false }).limit(100),
                    getUserFinancialData(user.uid || user.id, user.email),
                    getUserProgress(user.uid || user.id),
                    supabase.from('market_quotes').select('*')
                ]);

                if (newsRes.data) setNews(newsRes.data);
                setFinancialData(finRes);
                setAcademicProgress(progRes);
                if (quotesRes.data) setQuotes(quotesRes.data);
            } catch (err) {
                console.error("Dashboard Data Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();

        // Suscripciones optimizadas
        const newsChannel = supabase.channel('news_realtime')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'noticias' }, payload => {
                setNews(prev => [payload.new, ...prev]);
            }).subscribe();

        return () => {
            supabase.removeChannel(newsChannel);
        };
    }, [user]);

    const filteredNews = useMemo(() => {
        return news.filter(item => {
            const scopeMatch = activeScope === 'Todos' || item.scope === activeScope;
            const catMatch = activeCategory === 'Todas' || item.category === activeCategory;
            return scopeMatch && catMatch;
        });
    }, [news, activeScope, activeCategory]);

    return (
        <Layout>
            <div className="space-y-12 pb-20">
                <div className="-mx-4 md:-mx-8 bg-[#F76B1C] shadow-lg relative z-20">
                    <MarqueeTicker />
                </div>

                <WelcomeHero />

                <div className="space-y-8">
                    <DolarAPIWidget />
                    <MarketIndicators />
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-sky-500/5 rounded-xl border border-sky-500/10 w-fit">
                            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                            <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Live Analysis</span>
                        </div>
                        <TradingViewChart symbol="BCBA:GGAL" />
                    </div>

                    <MarketSimulator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <PortfolioPieChart wallet={financialData?.wallet} assets={financialData?.assets} quotes={quotes} />
                        <EducationWidget progressData={academicProgress} />
                    </div>
                </div>

                {/* Banner Destacado */}
                <NeumorphicPanel
                    className="group p-6 md:p-10 bg-gradient-to-br from-[#1c2230] to-[#0a0e1a] border-l-4 border-[#F76B1C] cursor-pointer hover:translate-y-[-4px] transition-all duration-500 relative overflow-hidden"
                    onClick={() => navigate('/opinion/laboral')}
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                        <div className="flex-grow space-y-4 text-left">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-[#F76B1C]/10 rounded-full border border-[#F76B1C]/20 text-[9px] font-black text-[#F76B1C] uppercase tracking-[0.2em]">Especial Laboral</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-200 italic leading-none uppercase">
                                Ley de <span className="text-[#F76B1C]">Modernización</span>
                            </h2>
                        </div>
                        <ArrowRight className="text-white/20 group-hover:text-[#F76B1C] group-hover:translate-x-2 transition-all" size={40} />
                    </div>
                </NeumorphicPanel>

                <IAChatWidget />

                {/* Filtros de Noticias */}
                <div className="space-y-8">
                    <div className="flex flex-col gap-6 text-left">
                        <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase">Noticias</h2>
                        
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10">
                                {['Todos', 'Nacional', 'Internacional'].map((scope) => (
                                    <button
                                        key={scope}
                                        onClick={() => setActiveScope(scope)}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeScope === scope ? 'bg-[#F76B1C] text-white' : 'text-slate-500'}`}
                                    >
                                        {scope === 'Nacional' && <MapPin size={12} />}
                                        {scope === 'Internacional' && <Globe size={12} />}
                                        {scope}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase border transition-all ${activeCategory === cat ? 'bg-white text-black' : 'text-slate-500 border-white/5'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-white/5 rounded-[32px] animate-pulse" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
                            {filteredNews.length > 0 ? (
                                filteredNews.map((item) => <NewsCard key={item.id} item={item} />)
                            ) : (
                                <div className="col-span-full py-20 border border-dashed border-white/10 rounded-[32px] text-center">
                                    <p className="text-slate-500 font-black uppercase text-xs">Sin resultados</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
