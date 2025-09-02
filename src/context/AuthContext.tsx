import React, { createContext, useState, useContext, type ReactNode } from 'react';
import Cookies from 'js-cookie'; // Import the js-cookie library
import { type Member } from '../data/memberData';

interface AuthContextType {
    currentUser: Member | null;
    login: (user: Member) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get the initial state from the cookie
const getInitialUser = (): Member | null => {
    try {
        const storedUser = Cookies.get('currentUser'); // Get from cookie
        if (storedUser) {
            return JSON.parse(storedUser); // Parse the JSON string
        }
    } catch (error) {
        console.error("Failed to parse user from cookie", error);
        return null;
    }
    return null;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<Member | null>(getInitialUser());

    const login = (user: Member) => {
        // Save to a cookie. In a real app, the server would set an HttpOnly cookie.
        // The cookie will expire in 7 days.
        Cookies.set('currentUser', JSON.stringify(user), { expires: 7 });
        setCurrentUser(user);
        console.log("User logged in and saved to cookie:", user.username);
    };

    const logout = () => {
        // Remove the cookie
        Cookies.remove('currentUser');
        setCurrentUser(null);
        console.log("User logged out and cookie removed");
    };

    const value = { currentUser, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};