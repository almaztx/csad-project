import React, { createContext, useState, useEffect } from "react";
import { setLogoutHandler } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const logout = () => setToken(null);

    useEffect(() => {
        setLogoutHandler(logout);
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
