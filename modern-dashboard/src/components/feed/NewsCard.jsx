import React from 'react';
// ✅ IMPORTACIÓN CENTRALIZADA (Eliminamos createClient de aquí)
import { supabase } from '../../lib/supabase'; 
import { ExternalLink, Clock, Tag, Globe, Briefcase, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom'; // Para navegar al detalle sin recargar
import NeumorphicPanel from '../ui/NeumorphicPanel';

const NewsCard = React.memo(({ item }) => {
    // 1. Detección de color ampliada para tus servicios y regiones
    const getRadianceColor = (category, scope) => {
        const cat = category?.toLowerCase() || '';
        const scp = scope?.toLowerCase() || '';

        // Prioridad por Región (Entre Ríos / Buenos Aires)
        if (scp.includes('entre ríos')) return 'emerald'; 
        if (scp.includes('buenos aires')) return 'blue';

        // Prioridad por Servicio (Finanzas, Legal, RRHH, Tecno)
        if (cat.includes('finan') || cat.includes('mercado') || cat.includes('econo')) return 'blue';
        if (cat.includes('tech') || cat.includes('innovación')) return 'purple';
        if (cat.includes('legal')) return 'amber';
        if (cat.includes('recursos') || cat.includes('rrhh')) return 'emerald';

        return 'blue';
    };

    const radiance = getRadianceColor(item.category, item.scope);

    const cleanSummary = (text) => {
        if (!text) return 'Sin resumen disponible.';
        // Limpieza de HTML y entidades comunes
        let cleaned = text.replace(/<[^>]*>?/gm, '');
        cleaned = cleaned.replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
        return cleaned.trim();
    };

    let timeAgo = '';
    try {
        timeAgo = formatDistanceToNow(new Date(item.created_at || new Date()), { addSuffix: true, locale: es });
    } catch (e) {
        timeAgo = 'recientemente';
    }

    // 2. Iconos dinámicos basados en el Scope de Ramux
    const ScopeIcon = item.scope?.toLowerCase().includes('nacional') ? Briefcase : Globe;

    return (
        /* 
           Cambiamos el <a> por un <div> para manejar dos acciones: 
           1. Ver detalle interno (Link)
           2. Ir a la fuente externa (ExternalLink)
        */
        <div className="group h-full transition-all duration-300">
            <NeumorphicPanel
                radiance={radiance}
                className="p-5 h-full flex flex-col items-start text-left border-white/5 relative overflow-hidden transition-all duration-300 group-hover:scale-[1.01] hover:border-white/10 bg-[#0a0a0a]"
            >
                {/* Header: Badges Geográficos y de Fuente */}
                <div className="flex justify-between w-full items-start mb-6 relative z-10">
                    <div className="w-10 h-10 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center shadow-xl group-hover:border-white/20 transition-all">
                        <ScopeIcon size={18} className="text-white/60 group-hover:text-white" />
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                        {item.scope && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                <span className="text-[8px] font-black text-white/90 uppercase tracking-widest">
                                    {item.scope}
                                </span>
                            </div>
                        )}
                        {item.source_name && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
                                <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest">
                                    {item.source_name.split(' ')[0]}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-grow w-full relative z-10">
                    {/* Metadatos: Categoría y Tiempo */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-white/10 text-white/90 border border-white/5">
                            {item.category || 'CONSULTORÍA'}
                        </span>
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                            <Clock size={10} /> {timeAgo}
                        </span>
                    </div>

                    {/* Título - Link al detalle interno */}
                    <Link to={`/news/${item.id}`}>
                        <h3 className="text-sm md:text-base font-black text-white mb-3 group-hover:text-[#F76B1C] transition-colors leading-tight tracking-tighter italic uppercase">
                            {item.title}
                        </h3>
                    </Link>

                    {/* Resumen */}
                    <p className="text-[11px] text-slate-300/80 mb-6 line-clamp-3 leading-relaxed font-medium">
                        {cleanSummary(item.summary)}
                    </p>
                </div>

                {/* Footer: Acciones */}
                <div className="mt-auto pt-4 w-full flex justify-between items-center border-t border-white/5 relative z-10">
                    <Link 
                        to={`/news/${item.id}`} 
                        className="text-[10px] font-black text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all inline-flex items-center gap-2 uppercase italic"
                    >
                        VER DETALLE <ArrowRight size={12} className="text-[#F76B1C]" />
                    </Link>
                    
                    {/* Link externo original */}
                    <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <ExternalLink size={14} className="text-white/20 hover:text-[#F76B1C]" />
                    </a>
                </div>
            </NeumorphicPanel>
        </div>
    );
});

export default NewsCard;
