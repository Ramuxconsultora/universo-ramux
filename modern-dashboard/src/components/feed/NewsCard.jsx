import React from 'react';
import { ExternalLink, Clock, Tag, Globe, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import NeumorphicPanel from '../ui/NeumorphicPanel';

const NewsCard = React.memo(({ item }) => {
    // 1. Detección de color ampliada para cubrir las nuevas categorías del scraper
    const getRadianceColor = (category) => {
        const cat = category?.toLowerCase() || '';
        // Cubre "Economía" y "Mercado de Capitales"
        if (cat.includes('econ') || cat.includes('finan') || cat.includes('mercado') || cat.includes('cnv')) return 'blue';
        // Cubre "Tecnología" e "IA"
        if (cat.includes('tech') || cat.includes('ia') || cat.includes('tecno')) return 'purple';
        // Cubre la nueva categoría "Legal/Laboral"
        if (cat.includes('legal') || cat.includes('laboral') || cat.includes('norm')) return 'amber';
        return 'blue'; // Fallback
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

    // 3. Icono dinámico para el Scope (Nacional vs Internacional)
    const ScopeIcon = item.scope === 'Nacional' ? MapPin : Globe;

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group no-underline mb-4"
            style={{ transform: 'translate3d(0,0,0)' }}
        >
            <NeumorphicPanel
                radiance={radiance}
                className="p-4 h-full flex flex-col items-start text-left border-white/5 relative overflow-hidden"
            >
                {/* Opcional: Si el scraper trae imagen, se puede usar como un fondo muy sutil estilo Bento Cyber */}
                {item.image_url && (
                    <div
                        className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image_url})` }}
                    />
                )}

                {/* Header: Icono y Scope */}
                <div className="flex justify-between w-full items-start mb-4 relative z-10">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center shadow-xl group-hover:border-white/20 transition-all">
                        <Tag size={14} className="text-white/60" />
                    </div>

                    {/* Badge de Scope (Nacional/Internacional) provisto por el scraper */}
                    {item.scope && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-black/30 rounded-md border border-white/5">
                            <ScopeIcon size={10} className={item.scope === 'Nacional' ? 'text-amber-400' : 'text-blue-400'} />
                            <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">
                                {item.scope}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex-grow w-full relative z-10">
                    {/* Metadatos: Categoría y Tiempo */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">
                            {item.category || 'NOTICIA'}
                        </span>
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1">
                            <Clock size={8} /> {timeAgo}
                        </span>
                    </div>

                    {/* Título */}
                    <h3 className="text-xs md:text-sm font-bold text-white mb-2 group-hover:text-white/80 transition-colors leading-snug tracking-tight">
                        {item.title}
                    </h3>

                    {/* Resumen limpio */}
                    <p className="text-[10px] md:text-[11px] text-slate-400 mb-4 line-clamp-3 leading-relaxed font-medium">
                        {cleanSummary(item.summary)}
                    </p>
                </div>

                {/* Footer: Fuente y CTA */}
                <div className="mt-auto pt-4 w-full flex justify-between items-center border-t border-white/5 relative z-10">
                    <span className="text-[10px] font-black text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-2 opacity-80 group-hover:opacity-100">
                        LEER <ExternalLink size={10} />
                    </span>
                    <span className="text-[9px] font-black text-white/40 group-hover:text-[#F76B1C] transition-colors uppercase tracking-[0.2em]">
                        {item.source_name || 'RAMUX'}
                    </span>
                </div>
            </NeumorphicPanel>
        </a>
    );
});

export default NewsCard;
