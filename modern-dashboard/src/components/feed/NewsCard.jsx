import React from 'react';
import { ExternalLink, Clock, Tag, Globe, MapPin, Building2, Briefcase, Scale, Users, Cpu } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import NeumorphicPanel from '../ui/NeumorphicPanel';

const NewsCard = React.memo(({ item }) => {
    // 1. Detección de color ampliada y blindada para los nuevos tags de Ramux
    const getRadianceColor = (category, scope) => {
        const cat = category?.toLowerCase() || '';
        const scp = scope?.toLowerCase() || '';

        // Prioridad 1: Regiones específicas de la consultora
        if (scp.includes('entre ríos')) return 'emerald'; // Verde institucional para Entre Ríos
        if (scp.includes('buenos aires') || scp.includes('caba')) return 'blue';

        // Prioridad 2: Servicios de la consultora (Tags)
        if (cat.includes('finan') || cat.includes('asesoría') || cat.includes('econo')) return 'blue';
        if (cat.includes('tech') || cat.includes('tecno') || cat.includes('ia')) return 'purple';
        if (cat.includes('legal') || cat.includes('compliance') || cat.includes('regulación')) return 'amber';
        if (cat.includes('rrhh') || cat.includes('gestión') || cat.includes('laboral')) return 'emerald';
        if (cat.includes('region')) return 'emerald';

        return 'blue';
    };

    const radiance = getRadianceColor(item.category, item.scope);

    // 2. Limpieza robusta de HTML y entidades para Google News
    const cleanSummary = (text) => {
        if (!text) return 'Sin resumen disponible.';
        let cleaned = text.replace(/<[^>]*>?/gm, '');
        cleaned = cleaned.replace(/&nbsp;/g, ' ')
                         .replace(/&quot;/g, '"')
                         .replace(/&#39;/g, "'")
                         .replace(/&amp;/g, '&')
                         .replace(/&lt;/g, '<')
                         .replace(/&gt;/g, '>');
        return cleaned.trim();
    };

    let timeAgo = '';
    try {
        // Aseguramos que la fecha sea válida antes de formatear
        const date = item.created_at ? new Date(item.created_at) : new Date();
        timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: es });
    } catch (e) {
        timeAgo = 'recientemente';
    }

    // 3. Iconos dinámicos específicos para la especialidad de Ramux
    const getScopeIcon = (scope, category) => {
        const scp = scope?.toLowerCase() || '';
        const cat = category?.toLowerCase() || '';

        // Si es internacional, siempre el globo
        if (scp.includes('internacional')) return Globe;
        
        // Iconos por servicio si no es geográfico estricto
        if (cat.includes('legal')) return Scale;
        if (cat.includes('rrhh')) return Users;
        if (cat.includes('tech')) return Cpu;

        // Iconos por alcance geográfico nacional/provincial
        if (scp.includes('entre ríos')) return Building2; 
        if (scp.includes('buenos aires')) return MapPin;
        if (scp.includes('nacional')) return Briefcase;
        
        return Tag;
    };
    
    const ScopeIcon = getScopeIcon(item.scope, item.category);

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group no-underline h-full"
            style={{ transform: 'translate3d(0,0,0)' }}
        >
            <NeumorphicPanel
                radiance={radiance}
                className="p-5 h-full flex flex-col items-start text-left border-white/5 relative overflow-hidden transition-all duration-300 group-hover:scale-[1.01] hover:border-white/10"
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

                    {/* Título - Itálico y Heavy */}
                    <h3 className="text-sm md:text-base font-black text-white mb-3 group-hover:text-[#F76B1C] transition-colors leading-tight tracking-tighter italic uppercase">
                        {item.title}
                    </h3>

                    {/* Resumen */}
                    <p className="text-[11px] text-slate-300/80 mb-6 line-clamp-3 leading-relaxed font-medium">
                        {cleanSummary(item.summary)}
                    </p>
                </div>

                {/* Footer: CTA con efecto hover */}
                <div className="mt-auto pt-4 w-full flex justify-between items-center border-t border-white/5 relative z-10">
                    <span className="text-[10px] font-black text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all inline-flex items-center gap-2">
                        LEER ARTÍCULO <ExternalLink size={10} className="text-[#F76B1C]" />
                    </span>
                </div>
            </NeumorphicPanel>
        </a>
    );
});

export default NewsCard;
