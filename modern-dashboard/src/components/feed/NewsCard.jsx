import React from 'react';
import { ExternalLink, Clock, Tag, Globe, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import NeumorphicPanel from '../ui/NeumorphicPanel';

const NewsCard = React.memo(({ item }) => {
    // 1. Detección de color ampliada para cubrir las nuevas categorías del scraper
    const getRadianceColor = (category) => {
        const cat = category?.toLowerCase() || '';
        if (cat.includes('finan') || cat.includes('asesoría')) return 'blue';
        if (cat.includes('tech') || cat.includes('tecno')) return 'purple';
        if (cat.includes('legal') || cat.includes('compliance')) return 'amber';
        if (cat.includes('rrhh') || cat.includes('gestión')) return 'emerald';
        return 'blue';
    };

    const radiance = getRadianceColor(item.category);

    // 2. Limpieza más robusta del resumen (Google News RSS deja muchos "entities" ocultos)
    const cleanSummary = (text) => {
        if (!text) return '';
        let cleaned = text.replace(/<[^>]*>?/gm, ''); // Quita etiquetas HTML
        // Limpia entidades comunes de HTML que ensucian la UI
        cleaned = cleaned.replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
        return cleaned.trim();
    };

    let timeAgo = '';
    try {
        timeAgo = formatDistanceToNow(new Date(item.created_at || new Date()), { addSuffix: true, locale: es });
    } catch (e) {
        timeAgo = 'hace poco';
    }

    // 3. Icono dinámico para el Scope
    const getScopeIcon = (scope) => {
        if (scope === 'Nacional') return MapPin;
        if (scope === 'Internacional') return Globe;
        return Tag;
    };
    const ScopeIcon = getScopeIcon(item.scope);

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group no-underline"
            style={{ transform: 'translate3d(0,0,0)' }}
        >
            <NeumorphicPanel
                radiance={radiance}
                className="p-5 h-full flex flex-col items-start text-left border-white/5 relative overflow-hidden transition-all duration-300 group-hover:scale-[1.01]"
            >
                {/* Header: Icono y Badges */}
                <div className="flex justify-between w-full items-start mb-6 relative z-10">
                    <div className="w-10 h-10 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center shadow-xl group-hover:border-white/20 transition-all">
                        <Tag size={16} className="text-white/60" />
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                        {item.scope && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 rounded-full border border-sky-500/20">
                                <ScopeIcon size={10} className="text-sky-400" />
                                <span className="text-[8px] font-black text-white uppercase tracking-widest">
                                    {item.scope}
                                </span>
                            </div>
                        )}
                        {item.source_name && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
                                <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest">
                                    {item.source_name}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-grow w-full relative z-10">
                    {/* Metadatos: Categoría y Tiempo */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-white/5 text-white/80`}>
                            {item.category || 'NOTICIA'}
                        </span>
                        <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                        <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-1.5">
                            <Clock size={10} /> {timeAgo}
                        </span>
                    </div>

                    {/* Título */}
                    <h3 className="text-sm md:text-base font-black text-white mb-3 group-hover:text-[#F76B1C] transition-colors leading-tight tracking-tighter italic">
                        {item.title}
                    </h3>

                    {/* Resumen limpio */}
                    <p className="text-[11px] text-slate-200 mb-6 line-clamp-3 leading-relaxed font-medium">
                        {cleanSummary(item.summary)}
                    </p>
                </div>

                {/* Footer: CTA */}
                <div className="mt-auto pt-4 w-full flex justify-between items-center border-t border-white/5 relative z-10">
                    <span className="text-[10px] font-black text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-2 opacity-90 group-hover:opacity-100">
                        ACCEDER AL ARTÍCULO <ExternalLink size={10} />
                    </span>
                </div>
            </NeumorphicPanel>
        </a>
    );
});

export default NewsCard;
