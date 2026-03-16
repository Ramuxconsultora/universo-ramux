import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Clock, Filter, Globe, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// Components
import Layout from '../components/layout/Layout';
import NewsCard from '../components/feed/NewsCard';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import IAChatWidget from '../components/widgets/IAChatWidget';
import WelcomeHero from '../components/widgets/WelcomeHero';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('news');
    const [activeScope, setActiveScope] = useState('Todos');
    const [activeCategory, setActiveCategory] = useState('Todas');
    const navigate = useNavigate();

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    // Definición de categorías según el Scraper
    const categories = [
        'Todas', 
        'Finanzas y Mercado', 
        'Legales', 
        'Recursos Humanos', 
        'Tecnología e Innovación', 
        'Economía'
    ];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('noticias')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(300); // Aumentamos para cubrir las 20 noticias x 10 categorías

                if (error) throw error;
                setNews(data || []);
            } catch (err) {
                setErrorMsg(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();

        // Suscripción en tiempo real
        const channel = supabase
            .channel('news_changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'noticias' }, (payload) => {
                setNews((prev) => [payload.new, ...prev]);
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    // Lógica de Filtrado Unificada
    const filteredNews = useMemo(() => {
        return news.filter(item => {
            const scopeMatch = activeScope === 'Todos' || item.scope === activeScope;
            const catMatch = activeCategory === 'Todas' || item.category === activeCategory;
            return scopeMatch && catMatch;
        });
    }, [news, activeScope, activeCategory]);

    return (
        <Layout>
            <div className="space-y-12">
                <WelcomeHero />

                {/* Banner Destacado: Análisis de Coyuntura */}
                <NeumorphicPanel 
                    className="group p-6 md:p-10 bg-gradient-to-br from-[#1c2230] to-[#0a0e1a] border-l-4 border-[#F76B1C] cursor-pointer hover:translate-y-[-4px] transition-all duration-500 overflow-hidden relative"
                    onClick={() => navigate('/opinion/laboral')}
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#F76B1C]/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#F76B1C]/10 transition-colors" />
                    <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                        <div className="flex-grow space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-[#F76B1C]/10 rounded-full border border-[#F76B1C]/20 text-[9px] font-black text-[#F76B1C] uppercase tracking-[0.2em]">Coyuntura Nacional</span>
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><Clock size={10}/> Actualizado hoy</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white italic leading-none tracking-tighter uppercase">
                                El Impacto de la <br/><span className="text-[#F76B1C]">Reforma Técnica</span>
                            </h2>
                            <p className="text-sm text-slate-400 font-medium max-w-2xl">
                                Análisis profundo sobre las nuevas normativas legales y su repercusión en el mercado de capitales argentino.
                            </p>
                        </div>
                        <ArrowRight className="text-white/20 group-hover:text-[#F76B1C] group-hover:translate-x-2 transition-all" size={40} />
                    </div>
                </NeumorphicPanel>

                <IAChatWidget />

                {/* Sección de Feed con Filtros Avanzados */}
                <div className="space-y-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-baseline gap-6 border-b border-white/5 pb-4">
                            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase">Noticias</h2>
                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] hidden md:block">Strategic Intelligence</span>
                        </div>

                        {/* Selectores de Scope (Nacional/Internacional) */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10 shadow-inner">
                                {['Todos', 'Nacional', 'Internacional'].map((scope) => (
                                    <button
                                        key={scope}
                                        onClick={() => setActiveScope(scope)}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                            activeScope === scope 
                                            ? 'bg-[#F76B1C] text-white shadow-lg' 
                                            : 'text-slate-500 hover:text-white'
                                        }`}
                                    >
                                        {scope === 'Nacional' && <MapPin size={12} />}
                                        {scope === 'Internacional' && <Globe size={12} />}
                                        {scope}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selectores de Categoría */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${
                                        activeCategory === cat 
                                        ? 'bg-white text-black border-white' 
                                        : 'bg-transparent text-slate-500 border-white/5 hover:border-white/20 hover:text-slate-200'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid de Noticias */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50">
                            {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-white/5 rounded-[32px] animate-pulse" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
                            {filteredNews.length > 0 ? (
                                filteredNews.map((item) => <NewsCard key={item.id} item={item} />)
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-[32px]">
                                    <Filter size={40} className="text-slate-700 mb-4" />
                                    <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No hay resultados para esta combinación</p>
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
