import React from 'react';
import { User, Shield, Award, Zap, Star, Edit3, Check, X } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

const ProfileHeader = ({ user, onSignOut, onUpgrade, rank = "Novato", level = 1 }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [newName, setNewName] = React.useState(user?.displayName || '');
    const [updating, setUpdating] = React.useState(false);

    const userEmail = (user?.email || '').toLowerCase().trim();
    const userName = (user?.displayName || '').toLowerCase().trim();
    
    // Extremely permissive check for the founder
    const isFounder = userEmail.includes('silguero') || 
                      userEmail.includes('f92') || 
                      userName.includes('f92') || 
                      userName.includes('silguero') ||
                      userName.includes('fernando');

    console.log("[DEBUG-FOUNDER-CHECK]", {
        email: userEmail,
        name: userName,
        isFounder,
        uid: user?.uid
    });

    const handleUpdateName = async () => {
        if (!newName.trim() || updating) return;
        setUpdating(true);
        try {
            await updateProfile(auth.currentUser, {
                displayName: newName
            });
            setIsEditing(false);
            window.location.reload(); // Simple way to refresh the context/UI for now
        } catch (error) {
            console.error("Error updating profile name:", error);
            alert("Error al actualizar el nombre");
        } finally {
            setUpdating(false);
        }
    };

    // Determine color based on rank
    const getRankColor = (rankValue = rank) => {
        switch(rankValue.toLowerCase()) {
            case 'novato': return 'text-slate-400 border-slate-700 bg-slate-500/10';
            case 'analista': return 'text-sky-400 border-sky-500/30 bg-sky-500/10';
            case 'trader pro': return 'text-amber-500 border-amber-500/30 bg-amber-500/10';
            case 'ceo & founder': return 'text-amber-400 border-amber-400/50 bg-gradient-to-r from-amber-500/20 to-orange-600/20 shadow-[0_0_15px_rgba(251,191,36,0.2)] font-black italic';
            default: return 'text-sky-400 border-sky-500/30 bg-sky-500/10';
        }
    };

    return (
        <div className="space-y-6 animate-slide-up">
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 bg-slate-900/40 p-6 md:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl relative overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 blur-[100px] rounded-full group-hover:bg-sky-500/20 transition-all duration-700" />
                
                {/* Avatar Section */}
                <div className="relative">
                    <div className={`w-36 h-36 rounded-[2.5rem] bg-slate-800 border-2 p-1.5 shadow-lg transition-all duration-500 hover:rotate-2 ${
                        isFounder 
                        ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)] bg-gradient-to-br from-amber-500/20 to-orange-600/20' 
                        : 'border-sky-500/50 shadow-[0_0_30px_rgba(14,165,233,0.2)]'
                    }`}>
                        <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={48} className={isFounder ? "text-amber-400" : "text-sky-400"} />
                            )}
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[#F76B1C] border-2 border-slate-900 flex items-center justify-center shadow-lg shadow-[#F76B1C]/30 animate-pulse">
                        <Zap size={18} className="text-white fill-white" />
                    </div>
                </div>

                {/* Info Area */}
                <div className="flex-grow text-center lg:text-left space-y-4">
                    <div className="space-y-1">
                        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3">
                            {isEditing ? (
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="text" 
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="bg-white/10 border border-[#F76B1C]/30 rounded-xl px-4 py-1 text-white text-2xl font-black outline-none focus:border-[#F76B1C] transition-all"
                                        autoFocus
                                    />
                                    <button onClick={handleUpdateName} className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500/20 transition-all">
                                        <Check size={18} />
                                    </button>
                                    <button onClick={() => setIsEditing(false)} className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500/20 transition-all">
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row items-center gap-3">
                                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
                                        {user?.displayName || user?.email?.split('@')[0]}
                                    </h1>
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-[#F76B1C]/20 text-slate-400 hover:text-[#F76B1C] rounded-xl transition-all border border-white/5 group/edit"
                                    >
                                        <Edit3 size={12} className="group-hover/edit:scale-110 transition-transform" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Cambiar</span>
                                    </button>
                                </div>
                            )}
                            <span className={`px-4 py-1 rounded-full border text-[10px] uppercase tracking-widest ${getRankColor(isFounder ? "CEO & Founder" : rank)}`}>
                                {isFounder ? "CEO & Founder" : rank}
                            </span>
                        </div>
                        <p className="text-slate-400 font-mono text-sm tracking-tight">{user?.email}</p>
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                                <Award size={16} className="text-sky-400" />
                            </div>
                            <div className="text-xs">
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Nivel</p>
                                <p className="text-white font-black">{level}</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/5 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                <Shield size={16} className="text-emerald-400" />
                            </div>
                            <div className="text-xs">
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Cuenta</p>
                                <p className="text-white font-black">Vinculada con Google</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Badges Display & Actions */}
                <div className="flex flex-col gap-4">
                    <div className="flex gap-3 bg-white/5 p-4 rounded-3xl border border-white/5">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center group/badge hover:border-amber-500/50 hover:bg-amber-500/5 transition-all cursor-help relative">
                                <Star size={20} className="text-slate-600 group-hover/badge:text-amber-500 group-hover/badge:fill-amber-500 transition-all" />
                                {/* Tooltip placeholder */}
                                <div className="absolute bottom-full mb-3 px-2 py-1 bg-slate-800 text-[10px] font-bold text-white rounded opacity-0 group-hover/badge:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                                    Logro #{i}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={onUpgrade}
                            className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20 transition-all font-black text-[9px] uppercase tracking-widest"
                        >
                            <Zap size={14} /> Forzar Upgrade
                        </button>
                        <button
                            onClick={onSignOut}
                            className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-white/5 text-slate-500 border border-white/5 hover:bg-rose-500/10 hover:text-rose-400 transition-all font-black text-[9px] uppercase tracking-widest"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
