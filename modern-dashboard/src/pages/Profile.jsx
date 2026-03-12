import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import GlassPanel from '../components/ui/GlassPanel';
import { LogOut, User, Settings, Shield } from 'lucide-react';

const Profile = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Simple protection: if not logged in, go to login
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null; // Avoid flicker while redirecting

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">

                {/* Header Profile Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.3)] flex items-center justify-center text-5xl font-bold font-mono text-sky-400">
                            {user.email ? user.email.charAt(0).toUpperCase() : <User size={40} />}
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">{user.email?.split('@')[0]}</h1>
                            <p className="text-slate-400 font-mono text-sm mt-1">{user.email}</p>
                            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                                Usuario Verificado
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all font-bold text-sm"
                    >
                        <LogOut size={16} /> Cerrar Sesión
                    </button>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GlassPanel className="p-6">
                        <div className="flex items-center gap-3 text-slate-400 mb-2">
                            <Shield size={18} />
                            <h3 className="font-bold">ID de Cuenta</h3>
                        </div>
                        <p className="font-mono text-xs text-slate-300 break-all">{user.id}</p>
                    </GlassPanel>

                    <GlassPanel className="p-6">
                        <div className="flex items-center gap-3 text-slate-400 mb-2">
                            <Settings size={18} />
                            <h3 className="font-bold">Ajustes Generales</h3>
                        </div>
                        <p className="text-sm text-slate-500">Configuración de notificaciones y preferencias del entorno.</p>
                    </GlassPanel>
                </div>

                {/* Form Placeholder */}
                <GlassPanel className="p-8 mt-8 border-t-2 border-t-purple-500/50 relative overflow-hidden">
                    {/* Background glows removed for performance */}

                    <h2 className="text-xl font-bold text-white mb-6">Información Personal</h2>

                    <form className="space-y-6 max-w-2xl relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">Nombre Completo</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-900 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                                    placeholder="Ingresa tu nombre"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">Rol o Profesión</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-900 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                                    placeholder="Ej: Inversor Institucional"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400">Biografía Pública</label>
                            <textarea
                                className="w-full bg-slate-900 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors min-h-[100px] resize-y"
                                placeholder="Cuéntanos sobre tu interés en el mercado financiero..."
                            ></textarea>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-lg shadow-sky-600/20">
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </GlassPanel>

            </div>
        </Layout>
    );
};

export default Profile;
