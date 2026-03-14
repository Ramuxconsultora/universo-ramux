import React from 'react';
import { ExternalLink, Clock, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import NeumorphicPanel from '../ui/NeumorphicPanel';

const NewsCard = ({ item }) => {
    // Determine radiance color based on category
    const getRadianceColor = (category) => {
        const cat = category?.toLowerCase() || '';
        if (cat.includes('econ') || cat.includes('finan')) return 'blue';
        if (cat.includes('tech') || cat.includes('ia') || cat.includes('tecno')) return 'purple';
        if (cat.includes('legal') || cat.includes('norm')) return 'amber';
        return 'blue';
    };

    const radiance = getRadianceColor(item.category);

    // Time format
    let timeAgo = '';
    try {
        timeAgo = formatDistanceToNow(new Date(item.created_at || new Date()), { addSuffix: true, locale: es });
    } catch (e) {
        timeAgo = 'hace poco';
    }

    return (
        <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block group no-underline mb-4"
        >
            <NeumorphicPanel 
                radiance={radiance} 
                className="p-8 h-full flex flex-col items-start text-left"
            >
                {/* Reference Icon (Top Left) */}
                <div className="w-12 h-12 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center mb-6 shadow-xl group-hover:border-white/20 transition-all">
                    <Tag size={20} className="text-white/60" />
                </div>

                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                            {item.category || 'NOTICIA'}
                        </span>
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-1">
                            <Clock size={10} /> {timeAgo}
                        </span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-white/80 transition-colors leading-[1.3] tracking-tight">
                        {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 mb-6 line-clamp-3 leading-relaxed font-medium">
                        {item.summary || item.content}
                    </p>
                </div>

                <div className="mt-auto pt-6 w-full flex justify-between items-center border-t border-white/5">
                    <span className="text-[11px] font-black text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                        LEER ARTÍCULO <ExternalLink size={12} />
                    </span>
                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">
                        {item.source_name || item.source || 'RAMUX_INTEL'}
                    </span>
                </div>
            </NeumorphicPanel>
        </a>
    );
};

export default NewsCard;
