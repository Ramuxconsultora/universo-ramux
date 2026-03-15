import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import NavigationBar from './NavigationBar';
import { NavProvider } from '../../contexts/NavContext';
import galacticBackground from '../../assets/galactic-background.png';

const Layout = ({ children, showNav = true }) => {
    return (
        <NavProvider>
            <div className="antialiased min-h-screen flex flex-col font-sans text-white relative bg-[#02040a]">
                {/* Galactic Background Layer */}
                <div className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
                    style={{ backgroundImage: `url(${galacticBackground})` }}
                ></div>
                
                {/* Cosmic Overlay for Legibility */}
                <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#02040a]/40 via-transparent to-[#02040a]/80 pointer-events-none"></div>

                <Header />

                <div className="flex-grow pt-28 pb-12 px-4 max-w-[1600px] mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-12">
                    {/* Main Content Area */}
                    <main className="flex-grow w-full space-y-8">
                        {showNav && <NavigationBar />}
                        {children}
                    </main>

                    {/* Global Sidebar (Menu) */}
                    <Sidebar />
                </div>

                <Footer />
            </div>
        </NavProvider>
    );
};

export default Layout;
