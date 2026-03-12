import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Crown, Medal, User, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Ranking = () => {
    const { user } = useAuth();
    const [rankingData, setRankingData] = useState([]);

    useEffect(() => {
        // Fallback for names and scores if not logged in or from local storage (mock logic)
        const currentUserEmail = user?.email || 'Usuario';
        const currentName = currentUserEmail.split('@')[0] || 'Tú';

        const currentXP = parseInt(localStorage.getItem('cnv_xp') || '150');
        const currentSocial = parseInt(localStorage.getItem('ramux_social_score') || '0');
        const roi = 12.5;

        const myScore = currentXP + (currentSocial * 2) + Math.round(roi * 10);

        const mockUsers = [
            { name: 'Ana_Trader', lvl: 4, xp: 2500, social: 450, roi: 45.2 },
            { name: 'CryptoKing', lvl: 3, xp: 1800, social: 1200, roi: 120.5 },
            { name: 'JuanPerez', lvl: 2, xp: 800, social: 100, roi: -5.0 },
            { name: 'SofiaBull', lvl: 5, xp: 3200, social: 800, roi: 28.4 },
            { name: 'BearWhale', lvl: 3, xp: 1500, social: 200, roi: 15.0 },
            { name: currentName, lvl: 1, xp: currentXP, social: currentSocial, roi: roi, isMe: true }
        ];

        // Calculate Totals & Sort
        mockUsers.forEach(u => {
            u.total = u.xp + (u.social * 2) + Math.round(u.roi * 10);
        });

        mockUsers.sort((a, b) => b.total - a.total);
        setRankingData(mockUsers);
    }, [user]);

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="text-yellow-400 mx-auto filter drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" size={24} />;
        if (index === 1) return <Medal className="text-slate-300 mx-auto filter drop-shadow-[0_0_8px_rgba(203,213,225,0.5)]" size={24} />;
        if (index === 2) return <Medal className="text-amber-600 mx-auto filter drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]" size={24} />;
        return <span className="text-slate-500 font-mono font-bold text-lg">#{index + 1}</span>;
    };

    return (
        <Layout>
            <div className="animate-fade-in pb-20 max-w-5xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight flex justify-center items-center gap-4">
                        <Crown className="text-yellow-400" size={48} />
                        RANKING GLOBAL
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Compara tu progreso, experiencia y rendimiento con otros traders de la academia.
                    </p>
                </div>

                {/* Table Container */}
                <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-slate-900/80 text-xs uppercase text-slate-400 font-bold border-b border-white/10">
                                    <th className="p-5 text-center w-20">Rank</th>
                                    <th className="p-5">Usuario</th>
                                    <th className="p-5 text-center">Nivel</th>
                                    <th className="p-5 text-right"><div className="flex items-center justify-end gap-2"><TrendingUp size={14} /> ROI</div></th>
                                    <th className="p-5 text-right"><div className="flex items-center justify-end gap-2"><Users size={14} /> Social</div></th>
                                    <th className="p-5 text-right text-orange-400">Puntaje Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankingData.map((u, index) => (
                                    <tr
                                        key={index}
                                        className={`transition-colors border-b border-white/5 hover:bg-slate-800/50 ${u.isMe ? 'bg-sky-500/10 border-l-4 border-l-sky-500' : ''}`}
                                    >
                                        <td className="p-5 text-center align-middle">
                                            {getRankIcon(index)}
                                        </td>
                                        <td className="p-5 flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm shadow-inner ${u.isMe ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                                                <User size={18} />
                                            </div>
                                            <span className={`font-bold text-base ${u.isMe ? 'text-sky-400' : 'text-white'}`}>
                                                {u.name} {u.isMe ? '(Tú)' : ''}
                                            </span>
                                        </td>
                                        <td className="p-5 text-center text-slate-300 font-mono text-lg">{u.lvl}</td>
                                        <td className={`p-5 text-right font-mono font-bold ${u.roi >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {u.roi > 0 ? '+' : ''}{u.roi.toFixed(1)}%
                                        </td>
                                        <td className="p-5 text-right font-mono text-sky-300 font-medium">
                                            {u.social.toLocaleString()}
                                        </td>
                                        <td className="p-5 text-right font-black text-white text-xl">
                                            {u.total.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Ranking;
