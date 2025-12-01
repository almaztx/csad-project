import React, { createContext, useState, useEffect } from "react";
import { getMe } from "../api/auth"; // ← импортируй
import { setLogoutHandler } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            getMe(token)
                .then(setUser)
                .catch(() => setToken(null));
        } else {
            localStorage.removeItem("token");
            setUser(null);
            navigate("/login", { replace: true });
        }
    }, [token]);

    const logout = () => {
        setToken(null);
    };

    useEffect(() => {
        setLogoutHandler(logout);
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
