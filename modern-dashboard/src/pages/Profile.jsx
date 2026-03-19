import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import { Loader2, TrendingUp, GraduationCap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getUserFinancialData, updateProfileField } from '../lib/walletService';

// Profile Components
import ProfileHeader from '../components/profile/ProfileHeader';
import WalletSection from '../components/profile/WalletSection';
import ProgressSection from '../components/profile/ProgressSection';
import ModuleNavigationWidgets from '../components/profile/ModuleNavigationWidgets';
import FeaturedOpinionWidget from '../components/profile/FeaturedOpinionWidget';
import SettingsSection from '../components/profile/SettingsSection';
import PortfolioPieChart from '../components/widgets/PortfolioPieChart';
import PortfolioValueChart from '../components/widgets/PortfolioValueChart';

const Profile = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [financialData, setFinancialData] = useState(null);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            const [finData, quotesRes] = await Promise.all([
                getUserFinancialData(user.uid, user.email),
                supabase.from('market_quotes').select('*')
            ]);
            
            setFinancialData(finData);
            if (quotesRes.data) setQuotes(quotesRes.data);
            setLoading(false);
        };

        fetchData();

        const channel = supabase.channel('market_quotes_profile')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'market_quotes' }, payload => {
                setQuotes(prev => prev.map(q => q.symbol === payload.new.symbol ? payload.new : q));
            }).subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, navigate]);

    if (!user) return null;

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto space-y-12 animate-fade-in py-12 px-4 md:px-8">
                
                {/* 1. Header & ID Profile */}
                <ProfileHeader 
                    user={user} 
                    onSignOut={handleSignOut}
                    rank={financialData?.profile?.rango}
                    level={financialData?.profile?.nivel}
                    onUpgrade={async () => {
                        console.log("[DEBUG] Manual upgrade triggered");
                        const result = await getUserFinancialData(user.uid, user.email);
                        if (result?.error) {
                            alert(`Error al inicializar: ${result.error}`);
                        } else {
                            window.location.reload();
                        }
                    }}
                />

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 space-y-4">
                        <Loader2 className="animate-spin text-[#F76B1C]" size={40} />
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Cargando tu Ecosistema...</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        
                        {/* Section 1: Education & Training (Priority) */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 px-2">
                                <div className="p-2 bg-[#F76B1C]/10 rounded-xl border border-[#F76B1C]/20">
                                    <GraduationCap className="text-[#F76B1C]" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">Mi Formación</h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Capacitaciones y Progreso Académico</p>
                                </div>
                            </div>
                            <ProgressSection />
                        </div>

                        {/* Section 2: Financial Wallet & Portfolio */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 px-2">
                                <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                    <TrendingUp className="text-emerald-500" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">Mi Economía</h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Billetera Personal y Posiciones en Cartera</p>
                                </div>
                            </div>
                            <WalletSection 
                                balance={financialData?.wallet?.ars_balance?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0,00"} 
                                usdBalance={financialData?.wallet?.usd_balance?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0,00"}
                                rmxBalance={financialData?.wallet?.rmx_balance?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0,00"}
                                history={financialData?.history?.map(h => ({
                                    id: h.id,
                                    type: h.type === 'BUY' ? 'spend' : 'gain',
                                    amount: `${h.type === 'BUY' ? '-' : '+'}${h.amount} ${h.ticker}`,
                                    label: `${h.type === 'BUY' ? 'Compra' : 'Venta'} de ${h.ticker}`,
                                    date: new Date(h.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })
                                }))}
                            />

                            {/* Analytics Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <PortfolioValueChart 
                                    wallet={financialData?.wallet} 
                                    history={financialData?.history} 
                                />
                                <PortfolioPieChart 
                                    wallet={financialData?.wallet}
                                    assets={financialData?.assets}
                                    quotes={quotes}
                                />
                            </div>
                        </div>

                        {/* Section 3: Navigation Hub (Capital & Radar) */}
                        <ModuleNavigationWidgets />

                        {/* Section 4: Featured Analysis (Opinión de Coyuntura) */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 px-2">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Análisis Destacado</h2>
                            </div>
                            <FeaturedOpinionWidget />
                        </div>

                        {/* Section 5: Settings (Bottom) */}
                        <div className="pt-10 border-t border-white/5">
                            <SettingsSection 
                                novedadesRmx={financialData?.profile?.novedades_rmx}
                                onToggleNovedades={async (val) => {
                                    const res = await updateProfileField(user.uid, 'novedades_rmx', val);
                                    if (res.success) {
                                        setFinancialData(prev => ({
                                            ...prev,
                                            profile: { ...prev.profile, novedades_rmx: val }
                                        }));
                                    }
                                }}
                            />
                        </div>

                    </div>
                )}

            </div>
        </Layout>
    );
};

export default Profile;
