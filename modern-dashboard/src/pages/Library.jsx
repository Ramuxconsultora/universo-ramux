import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Book, Search, FileText, Scale, Copy, BookOpen } from 'lucide-react';

const API_URL = 'http://localhost:5001/api';

const Library = () => {
    const [allDocs, setAllDocs] = useState([]);
    const [filteredDocs, setFilteredDocs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [docContent, setDocContent] = useState('');
    const [isLoadingList, setIsLoadingList] = useState(true);
    const [isLoadingDoc, setIsLoadingDoc] = useState(false);
    const [error, setError] = useState(null);

    // Initial Fetch
    useEffect(() => {
        fetchDocuments();
    }, []);

    // Filter Logic
    useEffect(() => {
        if (!searchTerm) {
            setFilteredDocs(allDocs);
            return;
        }
        const term = searchTerm.toLowerCase();
        const filtered = allDocs.filter(d => d.name.toLowerCase().includes(term));
        setFilteredDocs(filtered);
    }, [searchTerm, allDocs]);

    const fetchDocuments = async () => {
        setIsLoadingList(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/documents`);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setAllDocs(data);
            setFilteredDocs(data);

            // Check URL param ?doc=filename after loading docs
            const urlParams = new URLSearchParams(window.location.search);
            const docName = urlParams.get('doc');
            if (docName) {
                loadDocument(docName);
            }
        } catch (e) {
            console.error(e);
            setError('Error cargando lista. Asegurate de correr server.py en el backend.');
        } finally {
            setIsLoadingList(false);
        }
    };

    const loadDocument = async (filename) => {
        setSelectedDoc(filename);
        setIsLoadingDoc(true);
        setDocContent('');
        setError(null);

        // Update URL without reload
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('doc', filename);
        window.history.pushState({}, '', newUrl);

        try {
            const res = await fetch(`${API_URL}/document/content?name=${encodeURIComponent(filename)}`);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();

            if (data.error) {
                setError(`Error: ${data.error}`);
            } else {
                setDocContent(data.content);
            }
        } catch (e) {
            setError('Error de conexión con el servidor al cargar el documento.');
        } finally {
            setIsLoadingDoc(false);
        }
    };

    const copyContent = () => {
        if (docContent) {
            navigator.clipboard.writeText(docContent);
            alert("Texto copiado al portapapeles");
        }
    };

    const formatLegalText = (text) => {
        if (!text) return null;

        const lines = text.split('\n');

        return lines.map((line, index) => {
            const trimmed = line.trim();
            if (!trimmed) {
                return <br key={index} />;
            }

            // PATTERN DETECTION
            if (/^(T[ÍI]TULO|CAP[ÍI]TULO|SECCI[ÓO]N)\s+[IVX0-9]+/i.test(trimmed)) {
                return <h2 key={index} className="text-xl md:text-2xl font-bold text-white mt-8 mb-4 border-b border-sky-500/30 pb-2">{trimmed}</h2>;
            }
            if (/^(ART[ÍI]CULO|ART\.)\s+\d+/i.test(trimmed)) {
                return <h3 key={index} className="text-lg font-bold text-orange-400 mt-6 mb-2">{trimmed}</h3>;
            }
            if (/^ANEXO\s+[IVX0-9A-Z]+/i.test(trimmed)) {
                return <h2 key={index} className="text-xl font-bold text-sky-400 mt-8 mb-4">{trimmed}</h2>;
            }
            if (/^(\w\)|[0-9]+\.)\s+/.test(trimmed) && trimmed.length < 200) {
                return <div key={index} className="pl-4 md:pl-8 text-slate-300 py-1">{trimmed}</div>;
            }
            return <p key={index} className="mb-2 text-justify opacity-90 hover:opacity-100 transition-opacity">{trimmed}</p>;
        });
    };

    const renderSidebarItem = (doc) => {
        const isLaw = doc.name.toUpperCase().includes('LEY') || doc.name.toUpperCase().includes('DECRETO');
        const Icon = isLaw ? Scale : FileText;
        const colorClass = isLaw ? 'text-orange-400' : 'text-blue-400';
        const displayName = doc.name.replace(/\.txt$/i, '');
        const isSelected = selectedDoc === doc.name;

        return (
            <button
                key={doc.name}
                onClick={() => loadDocument(doc.name)}
                className={`w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3 group ${isSelected ? 'bg-slate-800 border space-y-0 border-sky-500/30' : 'hover:bg-slate-800'}`}
            >
                <Icon className={`${colorClass} mt-0.5 flex-shrink-0`} size={16} />
                <div className="overflow-hidden">
                    <div className={`text-xs font-semibold truncate ${isSelected ? 'text-sky-400' : 'text-slate-300 group-hover:text-white'}`} title={displayName}>
                        {displayName}
                    </div>
                </div>
            </button>
        );
    };

    return (
        <Layout>
            <div className="animate-fade-in pb-20 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row h-[80vh] bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                    {/* SIDEBAR DOCUMENT LIST */}
                    <aside className="w-full md:w-80 flex-shrink-0 flex flex-col bg-slate-900/95 border-r border-slate-700/50 z-20">
                        {/* Header */}
                        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/50">
                            <h2 className="font-bold text-lg text-white flex items-center gap-2">
                                <Book className="text-sky-400" size={20} /> Biblioteca
                            </h2>
                            <a href="/ia_normativa.html" className="text-xs text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1">
                                <span>Ir a la IA</span>
                            </a>
                        </div>

                        {/* Search */}
                        <div className="p-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-3.5 text-slate-500" size={14} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar documento..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all placeholder:text-slate-500"
                                />
                            </div>
                        </div>

                        {/* List */}
                        <div className="flex-grow overflow-y-auto px-2 pb-4 space-y-1 custom-scrollbar">
                            {isLoadingList ? (
                                <div className="text-center text-slate-500 text-xs mt-4 animate-pulse">Cargando documentos...</div>
                            ) : error && !selectedDoc ? (
                                <div className="text-red-400 text-xs p-4 text-center">{error}</div>
                            ) : filteredDocs.length === 0 ? (
                                <div className="text-slate-500 text-xs p-4 text-center">No se encontraron documentos</div>
                            ) : (
                                filteredDocs.map(renderSidebarItem)
                            )}
                        </div>
                    </aside>

                    {/* CONTENT VIEWER */}
                    <main className="flex-grow flex flex-col relative w-full bg-slate-900/20">
                        {/* Toolbar */}
                        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur z-10">
                            <h1 className="font-bold text-white truncate max-w-lg text-lg">
                                {selectedDoc ? selectedDoc.replace(/\.txt$/i, '') : 'Selecciona un documento'}
                            </h1>
                            {selectedDoc && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={copyContent}
                                        className="text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                                        title="Copiar texto"
                                    >
                                        <Copy size={18} />
                                        <span className="text-xs font-medium hidden sm:inline-block">Copiar</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Document Content */}
                        <div className="flex-grow overflow-y-auto p-6 md:p-10 scroll-smooth custom-scrollbar">
                            <div className="text-slate-300 text-sm leading-relaxed max-w-4xl mx-auto">
                                {isLoadingDoc ? (
                                    <div className="flex flex-col items-center justify-center h-full text-sky-400 gap-4 mt-20 animate-pulse">
                                        <BookOpen size={48} className="opacity-50" />
                                        <p>Cargando contenido del documento...</p>
                                    </div>
                                ) : error && selectedDoc ? (
                                    <div className="text-red-400 text-center mt-10 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                        {error}
                                    </div>
                                ) : docContent ? (
                                    <div className="prose prose-invert max-w-none">
                                        <div className="font-sans text-base md:text-lg text-slate-300 leading-relaxed space-y-4">
                                            {formatLegalText(docContent)}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 mt-32">
                                        <BookOpen size={64} className="opacity-20" />
                                        <p className="text-lg">Selecciona un documento de la lista para leerlo completo.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>

                </div>
            </div>
            <style jsx="true">{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #334155;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #0ea5e9;
                }
            `}</style>
        </Layout>
    );
};

export default Library;
