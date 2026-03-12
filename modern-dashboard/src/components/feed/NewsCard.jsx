import React from 'react';
import { ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import DynamicTranslateButton from '../ui/DynamicTranslateButton';

const NewsCard = ({ item }) => {
    // Determine color based on category/scope
    let catColorClass = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (item.category.includes('Tecnología') || item.category.includes('IA')) {
        catColorClass = 'text-sky-400 border-sky-500/30 bg-sky-500/10';
    }

    let scopeColorClass = 'text-slate-400';
    let dotColor = 'bg-slate-500';
    if (item.scope === 'Nacional') {
        scopeColorClass = 'text-sky-300';
        dotColor = 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]';
    } else if (item.scope === 'Internacional') {
        scopeColorClass = 'text-purple-300';
        dotColor = 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]';
    }

    const itemUrl = item.url || '#';

    // Time format
    let timeAgo = '';
    try {
        timeAgo = formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: es });
    } catch (e) { /* ignore parse error */ }

    return (
        <div className="relative pl-6 py-4 border-l border-slate-700/50 hover:border-slate-500 transition-colors group">
            {/* Timeline Dot */}
            <div className={`absolute -left-[4.5px] top-6 w-2 h-2 rounded-full ${dotColor}`}></div>

            <div className="flex flex-col gap-1.5">
                {/* Metadata Row */}
                <div className="flex items-center flex-wrap gap-2 text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-500">
                    <span className={`px-1.5 py-0.5 rounded border ${catColorClass}`}>
                        {item.category}
                    </span>
                    {item.scope && (
                        <span className={`font-bold ${scopeColorClass}`}>
                            [{item.scope}]
                        </span>
                    )}
                    <span className="text-slate-400 font-bold">• {item.source_name || item.source}</span>
                    {timeAgo && (
                        <span className="opacity-70">• {timeAgo}</span>
                    )}
                </div>

                {/* Title */}
                <a href={itemUrl} target="_blank" rel="noopener noreferrer" className="block mt-1 group-hover:text-sky-400 transition-colors duration-200">
                    <h3 className="text-lg md:text-xl font-bold text-slate-100 leading-snug">
                        {item.title}
                    </h3>
                </a>

                {/* Summary */}
                <p className="text-sm text-slate-400/80 leading-relaxed mt-1 line-clamp-2 md:line-clamp-3 font-light">
                    {item.summary}
                </p>

                {/* Actions */}
                <div className="mt-3">
                    <DynamicTranslateButton text={item.summary} />
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
