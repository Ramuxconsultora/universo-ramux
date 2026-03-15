import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
// Asegúrate de que este archivo '../firebase' exporte la instancia de 'auth' correctamente
import { auth } from '../firebase'; 
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';

const AuthContext = createContext({
    user: null,
    loading: true,
    signOut: () => Promise.resolve(),
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fallback de seguridad: si Firebase tarda demasiado, dejamos de cargar
        const timer = setTimeout(() => {
            setLoading(false);
        }, 8000);

        // Suscripción al estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            clearTimeout(timer);
        });

        return () => {
            unsubscribe();
            clearTimeout(timer);
        };
    }, []);

    const value = useMemo(() => ({
        user,
        loading,
        signOut: () => firebaseSignOut(auth),
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <div>Cargando aplicación...</div>}
        </AuthContext.Provider>
    );
};
