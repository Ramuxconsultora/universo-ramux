import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import { LogOut } from 'lucide-react';

// Profile Components
import ProfileHeader from '../components/profile/ProfileHeader';
import WalletSection from '../components/profile/WalletSection';
import ProgressSection from '../components/profile/ProgressSection';
import SettingsSection from '../components/profile/SettingsSection';

const Profile = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
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
                    <ProfileHeader user={user} />
                    
                    <button
                        onClick={handleSignOut}
                        className="absolute top-10 right-10 lg:relative lg:top-auto lg:right-auto lg:mt-6 flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white/5 text-slate-400 border border-white/5 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 transition-all font-black text-[10px] uppercase tracking-widest z-20"
                    >
                        <LogOut size={16} /> Cerrar Sesión
                    </button>
                </div>

                {/* Main Dashboard Grid */}
                <div className="space-y-16">
                    {/* Section 1: Financial & Wallet */}
                    <div className="space-y-6">
                        <WalletSection />
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

            </div>
        </Layout>
    );
};

export default Profile;
