import React from 'react';
import Header from './Header';
import ramuxSello from '../../assets/ramux-sello.png';

const Layout = ({ children }) => {
    return (
        <div className="antialiased min-h-screen flex flex-col font-sans text-white relative bg-[#151921]">
            {/* Minimal Background Plate */}
            <div className="fixed inset-0 z-[-1] opacity-[0.02] bg-center bg-no-repeat bg-[length:600px] pointer-events-none grayscale"
                style={{ backgroundImage: `url(${ramuxSello})` }}
            ></div>

            <Header />

            <main className="flex-grow pt-28 pb-12 px-4 max-w-7xl mx-auto w-full relative z-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;
