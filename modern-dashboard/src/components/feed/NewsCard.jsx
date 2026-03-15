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
                className="p-5 h-full flex flex-col items-start text-left border-white/5"
            >
                {/* Reference Icon (Top Left) - Smaller */}
                <div className="w-10 h-10 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center mb-4 shadow-xl group-hover:border-white/20 transition-all">
                    <Tag size={16} className="text-white/60" />
                </div>

                <div className="flex-grow w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">
                            {item.category || 'NOTICIA'}
                        </span>
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-1">
                            <Clock size={8} /> {timeAgo}
                        </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-2 group-hover:text-white/80 transition-colors leading-snug tracking-tight">
                        {item.title}
                    </h3>

                    <p className="text-[11px] text-slate-400 mb-4 line-clamp-3 leading-relaxed font-medium">
                        {(item.summary || item.content || '').replace(/<[^>]*>?/gm, '').trim()}
                    </p>
                </div>

                <div className="mt-auto pt-4 w-full flex justify-between items-center border-t border-white/5">
                    <span className="text-[10px] font-black text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-2 opacity-80 group-hover:opacity-100">
                        LEER <ExternalLink size={10} />
                    </span>
                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">
                        {item.source_name || item.source || 'RAMUX'}
                    </span>
                </div>
            </NeumorphicPanel>
        </a>
    );
};

export default NewsCard;
