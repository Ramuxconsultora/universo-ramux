import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Safety timeout: if auth doesn't respond in 3 seconds, stop loading
        const timer = setTimeout(() => {
            console.warn("Auth check timed out. Proceeding to render.");
            setLoading(false);
        }, 3000);

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            clearTimeout(timer);
            subscription.unsubscribe();
        };
    }, []);

    const value = {
        session,
        user,
        signOut: () => supabase.auth.signOut(),
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="min-h-screen bg-[#02040a] flex items-center justify-center text-white font-sans">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F76B1C]"></div>
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Iniciando Universo Ramux...</p>
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};
