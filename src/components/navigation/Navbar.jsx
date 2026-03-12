import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="nav-glass">
            <div className="nav-container">
                {/* Brand */}
                <div className="nav-brand">
                    <div className="nav-logo-icon">
                        <i className="fas fa-cube text-white"></i>
                    </div>
                    <span className="nav-logo-text">
                        RAMUX <span className="text-cyan-400">.EDU</span>
                    </span>
                </div>

                {/* Menu Actions */}
                <div className="nav-actions">
                    <button className="nav-item">
                        <i className="fas fa-home mr-2"></i> Dashboard
                    </button>
                    <button className="nav-item active">
                        <i className="fas fa-book mr-2"></i> Módulos
                    </button>

                    <div className="nav-separator"></div>

                    <button className="nav-item icon-only text-cyan-400">
                        <i className="fas fa-user-astronaut text-xl"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
