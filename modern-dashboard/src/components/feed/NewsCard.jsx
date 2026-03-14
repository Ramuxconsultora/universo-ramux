import React from 'react';
import { ExternalLink, Clock, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import NeumorphicPanel from '../ui/NeumorphicPanel';

const NewsCard = ({ item }) => {
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
            <NeumorphicPanel className="p-5 hover:bg-[#1d2331] transition-all transform hover:-translate-y-1 active:translate-y-0">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-[9px] font-bold text-[#F76B1C] uppercase tracking-widest">
                        <div className="p-1 px-2 bg-[#12161f] rounded-lg shadow-inner border border-black/10">
                            {item.category || 'NOTICIA'}
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-medium text-slate-500">
                        <Clock size={10} />
                        {timeAgo}
                    </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#F76B1C] transition-colors leading-tight">
                    {item.title}
                </h3>

                <p className="text-[11px] text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                    {item.summary || item.content}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-auto">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                        {item.source_name || item.source || 'RAMUX_INTEL'}
                    </span>
                    <ExternalLink size={12} className="text-slate-600 group-hover:text-[#F76B1C]" />
                </div>
            </NeumorphicPanel>
        </a>
    );
};

export default NewsCard;
