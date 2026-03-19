import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Usamos useCallback para que estas funciones mantengan su referencia 
    // y no disparen re-renders en los botones del Header o Sidebar
    const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);
    const openMenu = useCallback(() => setIsMenuOpen(true), []);

    // El valor del contexto solo cambia si cambia el estado isMenuOpen
    const value = useMemo(() => ({
        isMenuOpen,
        toggleMenu,
        closeMenu,
        openMenu
    }), [isMenuOpen, toggleMenu, closeMenu, openMenu]);

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation debe ser usado dentro de un NavigationProvider. Revisa que esté envolviendo al Layout.');
    }
    return context;
};
