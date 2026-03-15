import React, { createContext, useState, useContext, useMemo } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);
    const openMenu = () => setIsMenuOpen(true);

    const value = useMemo(() => ({
        isMenuOpen,
        toggleMenu,
        closeMenu,
        openMenu
    }), [isMenuOpen]);

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
