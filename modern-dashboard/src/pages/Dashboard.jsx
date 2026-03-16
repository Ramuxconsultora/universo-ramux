import React, { useState, useEffect, useMemo } from 'react';
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
    const [activeScope, setActiveScope] = useState('Todos');
    const [activeCategory, setActiveCategory] = useState('Todas');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [news, setNews] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data, error } = await supabase
                    .from('noticias')
                    .select('title, summary, category, source_name, url, scope, created_at')
                    .order('created_at', { ascending: false })
                    .limit(60); // Fetches more to allow for filtering

                if (error) {
                    setErrorMsg(error.message);
                } else if (data) {
                    setNews(data);
                }
            } catch (err) {
                setErrorMsg(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();

        const channel = supabase
            .channel('public:noticias')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'noticias' }, (payload) => {
                setNews((prev) => [payload.new, ...prev.slice(0, 39)]); // Keep limit consistent
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Unified filtering logic
    const filteredNews = useMemo(() => {
        return news.filter(item => {
            const scopeMatch = activeScope === 'Todos' || item.scope === activeScope;
            const categoryMatch = activeCategory === 'Todas' || item.category === activeCategory;
            return scopeMatch && categoryMatch;
        });
    }, [news, activeScope, activeCategory]);


    return (
        <Layout>
            <div className="space-y-12">
                <WelcomeHero />
                <NeumorphicPanel 
                    className="group p-5 md:p-8 bg-gradient-to-br from-[#1c2230] to-[#12161f] border-l-4 border-[#F76B1C] cursor-pointer hover:translate-y-[-2px] transition-all duration-500 overflow-hidden relative"
                    onClick={() => navigate('/opinion/laboral')}
                >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#F76B1C]/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#F76B1C]/10 transition-colors duration-700" />
                    
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
                                Análisis técnico sobre la Ley de Modernización Laboral. Desglizamos el cambio de paradigma estructural hacia un esquema de flexibilidad y reducción de barreras.
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

                <div className="mb-10">
                    <IAChatWidget />
                </div>

                <div className="flex flex-col gap-8 border-b border-white/5 pb-10 mb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-10">
                            <button
                                onClick={() => setActiveTab('news')}
                                className={`text-4xl lg:text-7xl font-black transition-all relative uppercase italic tracking-tighter ${activeTab === 'news' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                Noticias
                                {activeTab === 'news' && <div className="absolute -bottom-2 left-0 w-1/2 h-2.5 bg-[#F76B1C] rounded-full shadow-[0_0_20px_#F76B1C]" />}
                            </button>
                            <button
                                onClick={() => setActiveTab('community')}
                                className={`text-2xl lg:text-3xl font-black transition-all relative uppercase italic tracking-tighter mt-2 ${activeTab === 'community' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                Comunidad
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em]">Inteligencia Estratégica en tiempo real</p>
                    </div>

                    {activeTab === 'news' && (
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex bg-[#0a0e1a] p-1.5 rounded-[22px] shadow-2xl border border-white/5 ring-1 ring-white/10 overflow-x-auto no-scrollbar">
                                    {['Todos', 'Entre Ríos', 'Buenos Aires', 'Nacional', 'Internacional'].map((scope) => (
                                        <button
                                            key={scope}
                                            onClick={() => setActiveScope(scope)}
                                            className={`px-6 py-2.5 rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeScope === scope ? 'bg-[#F76B1C] text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                        >
                                            {scope}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 items-center">
                                {['Todas', 'Asesoría Financiera', 'Legal & Compliance', 'Gestión de RRHH', 'Tecnología', 'Regional'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${activeCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/20 hover:text-white'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-12">
                    {activeTab === 'news' && (
                        <div className="space-y-16">
                            {errorMsg && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-8 rounded-[32px] font-black text-sm uppercase tracking-widest text-center">
                                    [!] Error de conexión: {errorMsg}
                                </div>
                            )}

                            {news.length === 0 && !loading ? (
                                <NeumorphicPanel className="p-20 text-center bg-[#1c2230]/50">
                                    <p className="text-slate-300 font-black text-xs uppercase tracking-[0.5em] italic">Sin datos disponibles en este momento</p>
                                </NeumorphicPanel>
                            ) : (
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                    {loading ? (
                                        // Skeleton Loading State
                                        Array.from({ length: 4 }).map((_, i) => (
                                            <div key={i} className="bg-[#1c2230] rounded-[32px] p-4 h-[220px] animate-pulse flex flex-col gap-4 border border-white/5">
                                                <div className="flex justify-between">
                                                    <div className="w-10 h-10 bg-white/5 rounded-xl" />
                                                    <div className="w-20 h-4 bg-white/5 rounded-full" />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="w-24 h-3 bg-white/5 rounded-full" />
                                                    <div className="w-full h-4 bg-white/10 rounded-full" />
                                                    <div className="w-3/4 h-4 bg-white/10 rounded-full" />
                                                </div>
                                                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between">
                                                    <div className="w-12 h-3 bg-white/5 rounded-full" />
                                                    <div className="w-16 h-3 bg-white/5 rounded-full" />
                                                </div>
                                            </div>
                                        ))
                                    ) : filteredNews.length > 0 ? (
                                        filteredNews.map((item) => (
                                            <NewsCard key={item.id} item={item} />
                                        ))
                                    ) : (
                                        <div className="col-span-full py-20 text-center">
                                            <p className="text-slate-300 font-black text-xs uppercase tracking-[0.5em] italic">No hay noticias que coincidan con estos filtros</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'community' && (
                        <NeumorphicPanel className="p-20 text-center bg-[#1c2230]/50 border-white/5">
                    <div className="w-24 h-24 bg-[#0a0e1a] rounded-[32px] shadow-2xl border border-white/10 flex items-center justify-center mx-auto mb-8 ring-1 ring-white/5" style={{ transform: 'translate3d(0,0,0)' }}>
                                <Users size={40} className="text-sky-500/30" />
                            </div>
                            <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-4">Módulo en Desarrollo</h3>
                            <p className="text-slate-500 text-sm font-medium max-w-sm mx-auto leading-relaxed">Estamos construyendo el tejido social de la plataforma. Pronto podrás conectar con otros usuarios.</p>
                        </NeumorphicPanel>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
