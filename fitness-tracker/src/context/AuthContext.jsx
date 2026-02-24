import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('fitness_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Simulating API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const userData = { email, name: email.split('@')[0], id: 'user_123' };
                setUser(userData);
                setIsLoggedIn(true);
                localStorage.setItem('fitness_user', JSON.stringify(userData));
                resolve(userData);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('fitness_user');
    };

    const signup = (name, email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userData = { name, email, id: 'user_' + Date.now() };
                setUser(userData);
                setIsLoggedIn(true);
                localStorage.setItem('fitness_user', JSON.stringify(userData));
                resolve(userData);
            }, 1000);
        });
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, signup, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
