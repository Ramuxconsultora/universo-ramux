import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// ✅ IMPORTACIÓN CORREGIDA PARA VERCEL
import { supabase } from '../lib/supabase'; 
import Layout from '../components/layout/Layout';
import NeumorphicPanel from '../components/ui/NeumorphicPanel';
import { ArrowLeft, ExternalLink, Calendar, Tag, Share2, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Enlace copiado al portapapeles");
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="w-10 h-10 border-4 border-t-orange-500 border-white/10 rounded-full animate-spin"></div>
                </div>
            </Layout>
        );
    }

    if (!newsItem) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h2 className="text-xl font-black text-white italic uppercase mb-6">Contenido no disponible</h2>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl uppercase text-xs"
                    >
                        Volver al Dashboard
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto pb-20 px-4 animate-fade-in">
                
                {/* Botón Volver */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors group uppercase font-black text-[10px] tracking-widest"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-orange-500" />
                    Regresar al Feed
                </button>

                <NeumorphicPanel radiance="blue" className="p-0 overflow-hidden border-white/5 shadow-2xl bg-[#0a0a0a]">
                    
                    {/* Cabecera Estilo Ramux */}
                    <div className="p-8 md:p-12 border-b border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[9px] font-black uppercase tracking-[0.2em] rounded">
                                    {newsItem.category || 'GENERAL'}
                                </span>
                                <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest ml-auto">
                                    <Calendar size={12} className="text-orange-500" />
                                    {format(new Date(newsItem.created_at), "dd MMM yyyy", { locale: es })}
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter italic uppercase">
                                {newsItem.title}
                            </h1>
                            
                            <div className="flex items-center justify-between pt-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center">
                                        <Tag size={18} className="text-white/60" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] text-white/30 uppercase font-black tracking-widest">Fuente</p>
                                        <p className="text-sm text-white font-bold italic uppercase">{newsItem.source_name}</p>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleShare}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-orange-500/40 transition-all group"
                                >
                                    <Share2 size={18} className="text-white/40 group-hover:text-orange-500 transition-colors" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cuerpo de la Noticia */}
                    <div className="p-8 md:p-12">
                        <article className="max-w-none">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium mb-12 italic">
                                {newsItem.summary}
                            </p>
                        </article>

                        {/* Caja de Enlace Externo */}
                        {newsItem.url && (
                            <div className="mt-12 p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-white/10 transition-all">
                                <div className="text-center md:text-left">
                                    <h4 className="text-white font-black italic uppercase text-lg tracking-tighter mb-1">Nota Completa</h4>
                                    <p className="text-white/40 text-xs font-medium uppercase tracking-wide">Continúa leyendo en el portal oficial</p>
                                </div>
                                
                                <a
                                    href={newsItem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-black font-black italic uppercase rounded-xl transition-all shadow-xl shadow-orange-500/10 text-xs tracking-widest"
                                >
                                    IR A LA FUENTE <ExternalLink size={14} />
                                </a>
                            </div>
                        )}
                    </div>
                </NeumorphicPanel>
            </div>
        </Layout>
    );
}

export default NewsDetail;
