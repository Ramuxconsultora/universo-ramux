import React from 'react';
import { ExternalLink, Clock, Globe, Briefcase, Landmark, Cpu, Users, BarChart3, Scale } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import NeumorphicPanel from '../ui/NeumorphicPanel';

const NewsCard = React.memo(({ item }) => {
    
    // 1. Mapeo de colores y efectos por Categoría (Actualizado a tus 5 temas)
    const getCardStyling = (category) => {
        const cat = category?.toLowerCase() || '';
        if (cat.includes('finan') || cat.includes('mercado')) return { color: 'blue', icon: BarChart3 };
        if (cat.includes('tech') || cat.includes('innovación')) return { color: 'purple', icon: Cpu };
        if (cat.includes('legal')) return { color: 'amber', icon: Scale };
        if (cat.includes('recursos') || cat.includes('rrhh')) return { color: 'emerald', icon: Users };
        if (cat.includes('econo')) return { color: 'orange', icon: Landmark };
        return { color: 'blue', icon: Briefcase };
    };

    const styling = getCardStyling(item.category);
    const CategoryIcon = styling.icon;

    const cleanSummary = (text) => {
        if (!text) return 'Sin resumen disponible.';
        // Limpieza robusta de HTML y entidades
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

    // 2. Iconos dinámicos por Scope (Nacional vs Internacional)
    const getScopeIcon = (scope) => {
        const scp = scope?.toLowerCase() || '';
        return scp.includes('internacional') ? Globe : MapPin; // MapPin para Nacional
    };
    
    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group no-underline h-full"
            style={{ transform: 'translate3d(0,0,0)' }}
        >
            <NeumorphicPanel
                radiance={styling.color}
                className="p-5 h-full flex flex-col items-start text-left border-white/5 relative overflow-hidden transition-all duration-300 group-hover:scale-[1.02] hover:border-white/10"
            >
                {/* Header: Badge de Scope y Fuente */}
                <div className="flex justify-between w-full items-start mb-6 relative z-10">
                    <div className="w-10 h-10 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center shadow-xl group-hover:border-white/20 transition-all">
                        <CategoryIcon size={18} className="text-white/60 group-hover:text-white" />
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                        {item.scope && (
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                                item.scope.toLowerCase() === 'nacional' 
                                ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                                : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                            }`}>
                                {item.scope.toLowerCase() === 'internacional' ? <Globe size={8} /> : <Briefcase size={8} />}
                                <span className="text-[8px] font-black uppercase tracking-widest">
                                    {item.scope}
                                </span>
                            </div>
                        )}
                        {item.source_name && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">
                                    {item.source_name.replace(' - Google News', '').split(' ')[0]}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-grow w-full relative z-10">
                    {/* Metadatos */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-white/10 text-white/90 border border-white/5">
                            {item.category}
                        </span>
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                            <Clock size={10} /> {timeAgo}
                        </span>
                    </div>

                    {/* Título */}
                    <h3 className="text-sm md:text-base font-black text-white mb-3 group-hover:text-white transition-colors leading-tight tracking-tighter italic uppercase">
                        {item.title}
                    </h3>

                    {/* Resumen */}
                    <p className="text-[11px] text-slate-400/90 mb-6 line-clamp-3 leading-relaxed font-medium">
                        {cleanSummary(item.summary)}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 w-full flex justify-between items-center border-t border-white/5 relative z-10">
                    <span className="text-[10px] font-black text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all inline-flex items-center gap-2">
                        ANALIZAR IMPACTO <ExternalLink size={10} className="text-white/40" />
                    </span>
                </div>
            </NeumorphicPanel>
        </a>
    );
});

export default NewsCard;
