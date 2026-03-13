import React from 'react';
import Header from './Header';
import ramuxSello from '../../assets/ramux-sello.png';

const Layout = ({ children }) => {
    return (
        <div className="antialiased min-h-screen flex flex-col font-sans text-slate-100 selection:bg-sky-500/30 relative">
            {/* Fixed Background Image and Gradient - Using translateZ(0) for GPU isolation */}
            <div 
                className="fixed inset-0 z-[-2] bg-black pointer-events-none" 
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            ></div>
            <div
                className="fixed inset-0 z-[-1] opacity-5 bg-center bg-no-repeat bg-[length:800px] pointer-events-none"
                style={{ 
                    backgroundImage: `url(${ramuxSello})`,
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                }}
            ></div>

            {/* Scanline Overlay Removed for Performance */}

            <Header />

            <main className="flex-grow pt-28 pb-12 px-4 max-w-7xl mx-auto w-full relative z-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;
