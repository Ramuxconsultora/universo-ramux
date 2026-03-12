import React from 'react';
import './MainLayout.css';
import '../navigation/Navbar.css'; // Ensure Nav styles are available if needed or imported in Navbar

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout-container">
            {/* Background Layer */}
            <div className="fixed-background"></div>

            {/* Grid Structure */}
            <main className="main-content-grid">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
