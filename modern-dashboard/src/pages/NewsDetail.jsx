
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/layout/Layout';
import GlassPanel from '../components/ui/GlassPanel';
import { ArrowLeft, ExternalLink, Calendar, Tag, Share2 } from 'lucide-react';

function NewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data, error } = await supabase
                    .from('noticias')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setNewsItem(data);
            } catch (error) {
                console.error("Error fetching news detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
                </div>
            </Layout>
        );
    }

    if (!newsItem) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-white mb-4">Noticia no encontrada</h2>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                        Volver al Dashboard
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto animate-fade-in pb-20">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Volver
                </button>

                <GlassPanel className="p-0 overflow-hidden">
                    {/* Minimal Header */}
                    <div className="relative w-full p-8 md:p-12 border-b border-slate-700/50 bg-slate-800/20">
                        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                                <span className={`px-3 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${newsItem.category.includes('Tecnología') ? 'text-sky-400 border-sky-500/30 bg-sky-500/10' : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'}`}>
                                    {newsItem.category}
                                </span>
                                {newsItem.scope && (
                                    <span className={`px-3 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${newsItem.scope === 'Nacional' ? 'text-sky-300 border-sky-400/30 bg-sky-400/10' : 'text-purple-300 border-purple-400/30 bg-purple-400/10'}`}>
                                        [{newsItem.scope}]
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5 text-slate-400 text-xs font-mono font-medium ml-2">
                                    <Calendar size={13} />
                                    {new Date(newsItem.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-100 leading-tight">
                                {newsItem.title}
                            </h1>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-10 bg-slate-900/40">

                        <div className="flex justify-between items-center mb-8 border-b border-slate-700/50 pb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                                    <Tag size={18} className="text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase">Fuente</p>
                                    <p className="text-white font-bold">{newsItem.source_name}</p>
                                </div>
                            </div>

                            <button className="text-slate-400 hover:text-sky-400 transition-colors" title="Compartir">
                                <Share2 size={24} />
                            </button>
                        </div>

                        <article className="prose prose-invert max-w-none prose-lg text-slate-300 leading-relaxed mb-10">
                            <p>{newsItem.summary}</p> {/* In real implementation, render HTML or Markdown safely */}
                        </article>

                        {/* CTA Button */}
                        {newsItem.url && (
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h4 className="text-white font-bold text-lg">Leer artículo completo</h4>
                                    <p className="text-slate-400 text-sm">Visita la fuente original para más detalles.</p>
                                </div>
                                <a
                                    href={newsItem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-sky-600/20 transform hover:-translate-y-1"
                                >
                                    Ir a la Fuente <ExternalLink size={18} />
                                </a>
                            </div>
                        )}

                    </div>
                </GlassPanel>

            </div>
        </Layout>
    );
}

export default NewsDetail;
