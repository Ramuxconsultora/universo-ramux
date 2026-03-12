import React from 'react';
import './Navigation.css';
import '../animations/Animations.css';

const Navbar = () => {
    return (
        <nav className="nav-glass fixed top-0 w-full z-50 h-20 flex items-center justify-between px-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                    <i className="fas fa-cube text-white"></i>
                </div>
                <span className="font-bold text-xl tracking-wider text-white">
                    RAMUX <span className="text-cyan-400">.EDU</span>
                </span>
            </div>

            {/* Menu Actions */}
            <div className="flex gap-4 items-center">
                <button className="nav-item">
                    <i className="fas fa-home mr-2"></i> Dashboard
                </button>
                <button className="nav-item active">
                    <i className="fas fa-book mr-2"></i> Módulos
                </button>

                {/* Separator */}
                <div className="w-px h-8 bg-white/10 mx-2"></div>

                <button className="nav-item text-cyan-400 hover:text-cyan-300">
                    <i className="fas fa-user-astronaut text-xl"></i>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
