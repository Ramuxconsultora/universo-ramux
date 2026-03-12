import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import newsData from '../data/news.json'; // Direct import or fetch

const NewsDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [fontSize, setFontSize] = useState(0); // 0, 1, 2

    const fontClasses = ['text-base', 'text-lg', 'text-xl'];

    useEffect(() => {
        // Find article by ID
        const found = newsData.find(n => n.id === id);
        if (found) setArticle(found);
    }, [id]);

    const handleFontSize = (level) => {
        setFontSize(level);
    };

    if (!article) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
                <i className="fas fa-circle-notch fa-spin text-4xl text-ramux"></i>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-slate-950 text-slate-200 ${fontClasses[fontSize]} font-sans`}>
            {/* Header */}
            <header className="fixed w-full z-10 bg-slate-900/90 backdrop-blur border-b border-white/5 h-20 flex items-center px-6 justify-between">
                <Link to="/dashboard" className="flex items-center gap-2 hover:text-white transition-colors">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                        <i className="fas fa-arrow-left"></i>
                    </div>
                    <span>Volver</span>
                </Link>

                <h1 className="font-bold text-white tracking-widest uppercase text-sm">Ramux News Agent</h1>

                <div className="flex gap-2 bg-slate-800 p-1 rounded-lg">
                    <button onClick={() => handleFontSize(0)} className="w-8 h-8 rounded hover:bg-slate-700">A</button>
                    <button onClick={() => handleFontSize(1)} className="w-8 h-8 rounded hover:bg-slate-700 font-bold">A+</button>
                    <button onClick={() => handleFontSize(2)} className="w-8 h-8 rounded hover:bg-slate-700 font-black">A++</button>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto pt-32 px-6 pb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded bg-ramux/20 text-ramux text-xs font-bold uppercase border border-ramux/30">
                        {article.category}
                    </span>
                    <span className="text-slate-500 text-sm">
                        {new Date(article.date).toLocaleDateString()}
                    </span>
                </div>

                <h1 className="text-5xl font-black text-white mb-8 leading-tight">{article.title}</h1>

                {article.image && (
                    <img src={article.image} alt={article.title} className="w-full h-96 object-cover rounded-3xl mb-10 shadow-2xl border border-white/10" />
                )}

                <div className="p-8 rounded-2xl bg-slate-900/50 border-l-4 border-brand italic text-slate-300 text-lg mb-10">
                    "{article.summary}"
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed space-y-6">
                    {/* Dangerous HTML rendering or markdown parsing would go here */}
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>

                {/* Footer / Source */}
                <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center">
                    <div>
                        <p className="text-slate-500 text-sm uppercase tracking-wider">Fuente Original</p>
                        <p className="text-white font-bold">{article.source_name}</p>
                    </div>
                    <a
                        href={article.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-white/10"
                    >
                        <span>Ver en {article.source_name}</span>
                        <i className="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </main>
        </div>
    );
};

export default NewsDetail;
