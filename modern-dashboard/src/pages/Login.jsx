import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/layout/Layout';
import GlassPanel from '../components/ui/GlassPanel';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);
        setSuccessMsg(null);
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            setSuccessMsg('Revisa tu correo para confirmar el registro.');
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);
        setSuccessMsg(null);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            navigate('/profile');
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-[70vh] animate-fade-in">
                <GlassPanel className="w-full max-w-md p-8 md:p-10 relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500"></div>
                    {/* Background glows removed for performance */}

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-white mb-2">Universo Ramux</h2>
                            <p className="text-slate-400">Ingresa o crea tu cuenta para continuar</p>
                        </div>

                        {errorMsg && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6">
                                {errorMsg}
                            </div>
                        )}
                        {successMsg && (
                            <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-3 rounded-lg text-sm mb-6">
                                {successMsg}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-300 ml-1">Correo Electrónico</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-slate-500" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-sans"
                                        placeholder="tu@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-300 ml-1">Contraseña</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-slate-500" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-sans"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    onClick={handleEmailSignIn}
                                    disabled={loading || !email || !password}
                                    className="flex-1 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white py-3 px-4 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-600/20"
                                >
                                    <LogIn size={18} /> Iniciar Sesión
                                </button>
                                <button
                                    onClick={handleEmailSignUp}
                                    disabled={loading || !email || !password}
                                    className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600"
                                >
                                    <UserPlus size={18} /> Crear Cuenta
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700/50"></div>
                            </div>
                            <div className="relative bg-slate-900/60 px-4 text-xs tracking-widest text-slate-500 font-bold uppercase">
                                O continuar con
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 py-3 px-4 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Ingresa con Google
                            </button>
                        </div>
                    </div>
                </GlassPanel>
            </div>
        </Layout>
    );
};

export default Login;
