import React from 'react';
import { Settings, Bell, Shield, Key, Search, ExternalLink } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import { useNavigate } from 'react-router-dom';

const SettingsSection = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {/* Preferences & Security */}
            <GlassPanel className="p-10 space-y-8">
                <div className="flex items-center gap-3">
                    <Settings size={20} className="text-slate-400" />
                    <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Configuración</h4>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                            <Bell size={18} className="text-sky-400" />
                            <div>
                                <p className="text-[11px] font-black text-white uppercase tracking-tight">Notificaciones de Mercado</p>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Alertas de RMX y Noticias</p>
                            </div>
                        </div>
                        <div className="w-12 h-6 bg-sky-500/40 rounded-full flex items-center px-1.5 cursor-pointer border border-sky-500/20">
                            <div className="w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_8px_white] transform translate-x-5" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                            <Shield size={18} className="text-emerald-400" />
                            <div>
                                <p className="text-[11px] font-black text-white uppercase tracking-tight">Seguridad Biométrica / MFA</p>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Nivel de protección: Alto</p>
                            </div>
                        </div>
                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Activo</span>
                    </div>

                    <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 group">
                        <Key size={16} /> Cambiar Contraseña
                    </button>
                </div>
            </GlassPanel>

            {/* Quick Access / Labor Radar */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-4">
                    <Search size={20} className="text-amber-500" />
                    <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Accesos Directos</h4>
                </div>

                <div 
                    onClick={() => navigate('/radar-laboral')}
                    className="p-10 rounded-[2.5rem] bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 cursor-pointer group hover:from-amber-500/30 hover:to-orange-500/30 transition-all shadow-[0_20px_40px_rgba(245,158,11,0.1)] relative overflow-hidden"
                >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 blur-[60px] group-hover:bg-amber-500/20 transition-all" />
                    
                    <div className="relative z-10 space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/30">
                                <Search size={24} className="text-amber-500" />
                            </div>
                            <ExternalLink size={20} className="text-amber-500/40 group-hover:text-amber-500 transition-colors" />
                        </div>
                        <div>
                            <h5 className="text-2xl font-black text-white tracking-tighter italic uppercase">Radar Laboral</h5>
                            <p className="text-slate-400 text-xs font-medium mt-1">Consulta reformas vigentes de Argentina adaptadas a tu perfil de Inversor/Profesional.</p>
                        </div>
                        <div className="pt-2">
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest">
                                Consultar Ahora
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsSection;
