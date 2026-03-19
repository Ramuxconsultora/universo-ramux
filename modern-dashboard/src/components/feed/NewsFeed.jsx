import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; // Ajustado para subir dos niveles
import NewsCard from './NewsCard';
import NewsLock from './NewsLock';
import { useNavigate } from 'react-router-dom';

const NewsFeed = ({ news = [] }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="h-40 flex items-center justify-center text-white/20 uppercase font-black text-[10px] tracking-[0.5em]">Cargando Intel...</div>;

  return (
    <section className="w-full">
      {user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <NewsLock onAuthClick={() => navigate('/login')} />
      )}
    </section>
  );
};

export default NewsFeed;
