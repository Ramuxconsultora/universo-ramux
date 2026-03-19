¡import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; // ✅ Ruta estandarizada
import NewsCard from './NewsCard';
import NewsLock from './NewsLock';
import { useNavigate } from 'react-router-dom';
import { SearchX } from 'lucide-react';

const NewsFeed = ({ news = [] }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
            } catch (error) {
                console.error("Auth check error:", error);
            } finally {
                setLoading(false);
            }
        };
        
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    // Estado de carga con estética Heavy/Black
    if (loading) {
        return (
            <div className="h-60 flex flex-col items-center justify-center gap-4">
                <div className="w-8 h-8 border-2 border-t-orange-500 border-white/10 rounded-full animate-spin"></div>
                <p className="text-white/20 uppercase font-black text-[10px] tracking-[0.5em] italic">
                    Sincronizando Intel...
                </p>
            </div>
        );
    }

    return (
        <section className="w-full animate-fade-in">
            {user ? (
                <>
                    {news.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {news.map((item) => (
                                <NewsCard key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        /* Feedback visual si no hay noticias que coincidan con los filtros */
                        <div className="py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[2rem] bg-white/[0.02]">
                            <SearchX size={40} className="text-white/10 mb-4" />
                            <p className="text-white/40 uppercase font-black text-[10px] tracking-widest italic">
                                No se encontraron registros en este sector
                            </p>
                        </div>
                    )}
                </>
            ) : (
                /* Bloqueo si no hay sesión iniciada */
                <NewsLock onAuthClick={() => navigate('/login')} />
            )}
        </section>
    );
};

export default NewsFeed;
