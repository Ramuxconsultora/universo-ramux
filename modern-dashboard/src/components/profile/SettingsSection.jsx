import React from 'react';
import { Settings, Bell, Shield, Key, Search, ExternalLink } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import { useNavigate } from 'react-router-dom';

const SettingsSection = ({ novedadesRmx, onToggleNovedades }) => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {/* Preferences & Security */}
            <GlassPanel className="p-8 md:p-10 space-y-8">
                <div className="flex items-center gap-3">
                    <Settings size={20} className="text-slate-400" />
                    <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Configuración del Sistema</h4>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-2xl bg-sky-500/10 border border-sky-500/20">
                                <Bell size={18} className="text-sky-400" />
                            </div>
                            <div>
                                <p className="text-[11px] font-black text-white uppercase tracking-tight">Novedades RMX</p>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Alertas por Correo sobre análisis y features</p>
                            </div>
                        </div>
                        <div 
                            onClick={() => onToggleNovedades(!novedadesRmx)}
                            className={`w-12 h-6 rounded-full flex items-center px-1.5 cursor-pointer border transition-all duration-300 ${
                                novedadesRmx 
                                ? 'bg-emerald-500/40 border-emerald-500/20' 
                                : 'bg-slate-700/40 border-slate-600/20'
                            }`}
                        >
                            <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_8px_white] transition-transform duration-300 ${
                                novedadesRmx ? 'translate-x-5' : 'translate-x-0'
                            }`} />
                        </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-slate-900/40 border border-white/5">
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                            <span className="text-[#F76B1C] font-black uppercase tracking-widest">Nota:</span> Las notificaciones se enviarán automáticamente a tu correo de registro vinculado a Google. Estamos trabajando en el panel de granularidad.
                        </p>
                    </div>
                </div>
            </GlassPanel>

        </div>
    );
};

export default SettingsSection;
