import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Filter, Globe, MapPin } from 'lucide-react';

// ⚠️ REVISA QUE ESTE ARCHIVO EXISTA EN src/lib/supabase.js
import { supabase } from '../lib/supabase';

// Components
import { useAuth } from '../contexts/AuthContext';
import { getUserFinancialData, getUserProgress } from '../lib/walletService';
import Layout from '../components/layout/Layout';
import NewsCard from '../components/feed/NewsCard';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import IAChatWidget from '../components/widgets/IAChatWidget';
import WelcomeHero from '../components/widgets/WelcomeHero';
import DolarAPIWidget from '../components/widgets/DolarAPIWidget';
import MarketIndicators from '../components/widgets/MarketIndicators';
import MarketSimulator from '../components/widgets/MarketSimulator';
import MarqueeTicker from '../components/widgets/MarqueeTicker';
import PortfolioPieChart from '../components/widgets/PortfolioPieChart';
import EducationWidget from '../components/widgets/EducationWidget';
import TradingViewChart from '../components/widgets/TradingViewChart';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import NewsLock from '../components/feed/NewsLock';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Dashboard() {
    const { user } = useAuth();
    const [activeScope, setActiveScope] = useState('Todos');
    const [activeCategory, setActiveCategory] = useState('Todas');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
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
                // Usamos user.uid o user.id según lo que devuelva tu AuthContext
                const userId = user.uid || user.id;

                const [newsRes, finRes, progRes, quotesRes] = await Promise.all([
                    supabase.from('noticias').select('*').order('created_at', { ascending: false }).limit(100),
                    getUserFinancialData(userId, user.email),
                    getUserProgress(userId),
                    supabase.from('market_quotes').select('*')
                ]);

                if (newsRes.data) setNews(newsRes.data);
                setFinancialData(finRes);
                setAcademicProgress(progRes);
                if (quotesRes.data) setQuotes(quotesRes.data || []);
            } catch (err) {
                console.error("Dashboard Data Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();

        const newsChannel = supabase.channel('news_realtime')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'noticias' }, payload => {
                setNews(prev => [payload.new, ...prev]);
            }).subscribe();

        return () => {
            supabase.removeChannel(newsChannel);
        };
    }, [user]);

    const filteredNews = useMemo(() => {
        // 1. Filtrado básico inicial
        let filtered = news.filter(item => {
            const scopeMatch = activeScope === 'Todos' || item.scope === activeScope;
            const catMatch = activeCategory === 'Todas' || item.category === activeCategory;
            return scopeMatch && catMatch;
        });

        // 2. Lógica de Ordenamiento por Bloques para la vista "Todos/Todas"
        // Si estamos viendo todo (sin filtros específicos de ámbito), ordenamos por bloques:
        // Nacional -> Internacional -> Otros
        if (activeScope === 'Todos') {
            filtered = [...filtered].sort((a, b) => {
                const getScopeWeight = (scope) => {
                    const s = scope?.toLowerCase() || '';
                    if (s.includes('nacional')) return 0;
                    if (s.includes('internacional')) return 1;
                    return 2;
                };

                const weightA = getScopeWeight(a.scope);
                const weightB = getScopeWeight(b.scope);

                if (weightA !== weightB) return weightA - weightB;
                
                // Si pesan lo mismo, orden descendente por fecha
                return new Date(b.created_at) - new Date(a.created_at);
            });
        }

        return filtered;
    }, [news, activeScope, activeCategory]);

    const paginatedNews = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredNews.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredNews, currentPage, itemsPerPage]);

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
                        <PortfolioPieChart
                            wallet={financialData?.wallet}
                            assets={financialData?.assets}
                            quotes={quotes}
                        />
                        <EducationWidget progressData={academicProgress} />
                    </div>
                </div>

                <NeumorphicPanel
                    className="group p-6 md:p-10 bg-gradient-to-br from-[#1c2230] to-[#0a0e1a] border-l-4 border-[#F76B1C] cursor-pointer hover:translate-y-[-4px] transition-all duration-500 relative overflow-hidden"
                    onClick={() => navigate('/opinion/laboral')}
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center relative z-10 text-left">
                        <div className="flex-grow space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-[#F76B1C]/10 rounded-full border border-[#F76B1C]/20 text-[9px] font-black text-[#F76B1C] uppercase tracking-[0.2em]">Especial Laboral</span>
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-3xl md:text-5xl font-black text-slate-200 italic leading-none uppercase">
                                    La Nueva <span className="text-[#F76B1C]">Era del Trabajo</span>
                                </h2>
                                <p className="text-sm md:text-base font-bold !text-slate-100 uppercase tracking-tight opacity-80">
                                    Análisis Técnico de la Ley de Modernización Laboral
                                </p>
                            </div>
                        </div>
                        <ArrowRight className="text-white/20 group-hover:text-[#F76B1C] group-hover:translate-x-2 transition-all" size={40} />
                    </div>
                </NeumorphicPanel>

                <IAChatWidget />

                {/* News Section */}
                <div className="space-y-8" id="news-section">
                    <div className="flex flex-col gap-8 text-left">
                        <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase">Noticias</h2>
                        
                        {/* 1. Botones de Filtro Ámbito */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10">
                                {['Todos', 'Nacional', 'Internacional'].map((scope) => (
                                    <button
                                        key={scope}
                                        onClick={() => {
                                            setActiveScope(scope);
                                            setCurrentPage(1);
                                        }}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeScope === scope ? 'bg-[#F76B1C] text-white shadow-lg shadow-orange-500/10' : 'text-slate-500 hover:text-slate-300'}`}
                                    >
                                        {scope === 'Nacional' && <MapPin size={12} />}
                                        {scope === 'Internacional' && <Globe size={12} />}
                                        {scope}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Filtros por Tema (Tags) */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase border transition-all ${activeCategory === cat ? 'bg-white text-black' : 'text-slate-500 border-white/5 hover:border-white/20'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* 3. Paginación Superior */}
                        {user && filteredNews.length > itemsPerPage && (
                            <div className="flex items-center justify-between py-4 border-y border-white/5">
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                                    Página {currentPage} de {Math.ceil(filteredNews.length / itemsPerPage)}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setCurrentPage(prev => Math.max(1, prev - 1));
                                            document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/40 disabled:opacity-10 hover:bg-white/10 transition-all"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setCurrentPage(prev => Math.min(Math.ceil(filteredNews.length / itemsPerPage), prev + 1));
                                            document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        disabled={currentPage === Math.ceil(filteredNews.length / itemsPerPage)}
                                        className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/40 disabled:opacity-10 hover:bg-white/10 transition-all"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {!user ? (
                        <div className="py-12 bg-white/[0.02] rounded-[32px] border border-white/5">
                            <NewsLock onAuthClick={() => navigate('/login')} />
                        </div>
                    ) : loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-white/5 rounded-[32px] animate-pulse" />)}
                        </div>
                    ) : (
                        <>
                            {/* 4. Grilla de Noticias (Máx 8) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
                                {paginatedNews.length > 0 ? (
                                    paginatedNews.map((item) => (
                                        <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${paginatedNews.indexOf(item) * 100}ms` }}>
                                            <NewsCard item={item} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 border border-dashed border-white/10 rounded-[32px] text-center bg-white/[0.01]">
                                        <p className="text-slate-500 font-black uppercase text-xs tracking-widest">Sin resultados en esta categoría</p>
                                    </div>
                                )}
                            </div>

                            {/* 5. Paginación Inferior (Completa) */}
                            {filteredNews.length > itemsPerPage && (
                                <div className="flex flex-col items-center gap-6 mt-12 py-8 border-t border-white/5">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => {
                                                setCurrentPage(prev => Math.max(1, prev - 1));
                                                document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            disabled={currentPage === 1}
                                            className="p-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 disabled:opacity-20 hover:bg-white/10 hover:text-white transition-all group"
                                        >
                                            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                                        </button>

                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: Math.ceil(filteredNews.length / itemsPerPage) }).map((_, i) => {
                                                const pageNum = i + 1;
                                                const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
                                                
                                                if (totalPages > 5 && Math.abs(pageNum - currentPage) > 2 && pageNum !== 1 && pageNum !== totalPages) {
                                                    if (Math.abs(pageNum - currentPage) === 3) return <span key={i} className="text-white/20">...</span>;
                                                    return null;
                                                }

                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => {
                                                            setCurrentPage(pageNum);
                                                            document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' });
                                                        }}
                                                        className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${currentPage === pageNum ? 'bg-[#F76B1C] text-white shadow-lg shadow-orange-500/20' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <button
                                            onClick={() => {
                                                setCurrentPage(prev => Math.min(Math.ceil(filteredNews.length / itemsPerPage), prev + 1));
                                                document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            disabled={currentPage === Math.ceil(filteredNews.length / itemsPerPage)}
                                            className="p-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 disabled:opacity-20 hover:bg-white/10 hover:text-white transition-all group"
                                        >
                                            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                                        Mostrando {Math.min(filteredNews.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredNews.length, currentPage * itemsPerPage)} de {filteredNews.length} registros
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
