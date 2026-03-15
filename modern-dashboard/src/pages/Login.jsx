import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import Layout from '../components/layout/Layout';
import GlassPanel from '../components/ui/GlassPanel';
import { LogIn } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setErrorMsg(null);
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout 
            navProps={{ showBack: true, showHome: true, showMenu: true }}
        >
            <div className="flex items-center justify-center min-h-[60vh] animate-fade-in py-12">
                <GlassPanel className="w-full max-w-md p-10 relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#F76B1C] via-amber-500 to-yellow-500"></div>
                    
                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <div className="inline-block p-4 rounded-2xl bg-[#F76B1C]/10 border border-[#F76B1C]/20 mb-6">
                                <LogIn size={32} className="text-[#F76B1C]" />
                            </div>
                            <h2 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter italic">Universo Ramux</h2>
                            <p className="text-slate-400 font-medium">Ingresa a la plataforma para continuar</p>
                        </div>

                        {errorMsg && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm mb-8 flex items-center gap-3 animate-shake">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                                {errorMsg}
                            </div>
                        )}

                        <div className="space-y-6">
                            <button
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-4 bg-white hover:bg-slate-100 text-slate-900 py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(255,255,255,0.1)] group"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span className="group-hover:translate-x-1 transition-transform">Ingresar con Google</span>
                                    </>
                                )}
                            </button>
                            
                            <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-[0.2em] px-4 leading-relaxed">
                                Al ingresar, aceptas nuestros términos de servicio y políticas de privacidad.
                            </p>
                        </div>
                    </div>
                </GlassPanel>
            </div>
        </Layout>
    );
};

export default Login;
