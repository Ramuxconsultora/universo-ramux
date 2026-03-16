import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import { LogOut, Loader2, Zap } from 'lucide-react';
import { getUserFinancialData } from '../lib/walletService';

// Profile Components
import ProfileHeader from '../components/profile/ProfileHeader';
import WalletSection from '../components/profile/WalletSection';
import ProgressSection from '../components/profile/ProgressSection';
import SettingsSection from '../components/profile/SettingsSection';

const Profile = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [financialData, setFinancialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            const data = await getUserFinancialData(user.uid, user.email);
            setFinancialData(data);
            setLoading(false);
        };

        fetchData();
    }, [user, navigate]);

    if (!user) return null;

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto space-y-12 animate-fade-in py-12 px-4 md:px-8">
                
                {/* Header with Exit controls */}
                <div className="relative">
                    <ProfileHeader 
                        user={user} 
                        onSignOut={handleSignOut}
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
                    
                    {/* Identification Debug Info */}
                    <div className="mt-4 p-4 bg-black/40 rounded-2xl border border-white/5 text-[10px] font-mono space-y-1">
                        <p className="text-slate-500">Auth UID: {user.uid}</p>
                        <p className="text-slate-500">Auth Email: {user.email}</p>
                        <p className="text-slate-500">Auth Name: {user.displayName}</p>
                        <p className="text-[#F76B1C] font-black">Wallet Status: {financialData?.error ? `ERROR: ${financialData.error}` : (financialData?.wallet ? 'OK' : 'No Wallet Found')}</p>
                        {financialData?.error && (
                            <p className="text-rose-500/70">Dato técnico: Posible bloqueo de RLS en Supabase. Verifica políticas de la tabla 'user_wallets'.</p>
                        )}
                        <p className="text-slate-500">Wallet Info: {JSON.stringify(financialData?.wallet || 'No Data')}</p>
                    </div>
                </div>

                {/* Main Dashboard Grid */}
                {loading ? (
                    <div className="flex items-center justify-center p-20">
                        <Loader2 className="animate-spin text-[#F76B1C]" size={40} />
                    </div>
                ) : (
                    <div className="space-y-16">
                        {/* Section 1: Financial & Wallet */}
                        <div className="space-y-6">
                            <WalletSection 
                                balance={financialData?.wallet?.ars_balance?.toLocaleString('es-AR') || "0,00"} 
                                usdBalance={financialData?.wallet?.usd_balance?.toLocaleString('es-AR') || "0,00"}
                                history={financialData?.history?.map(h => ({
                                    id: h.id,
                                    type: h.type === 'BUY' ? 'spend' : 'gain',
                                    amount: `${h.type === 'BUY' ? '-' : '+'}${h.amount} ${h.ticker}`,
                                    label: `${h.type === 'BUY' ? 'Compra' : 'Venta'} de ${h.ticker}`,
                                    date: new Date(h.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })
                                }))}
                            />
                        </div>

                    {/* Section 2: Education & Progress */}
                    <div className="space-y-6">
                        <ProgressSection />
                    </div>

                    {/* Section 3: Settings & Radar */}
                    <div className="space-y-6 pb-20">
                        <SettingsSection />
                    </div>
                    </div>
                )}

            </div>
        </Layout>
    );
};

export default Profile;
