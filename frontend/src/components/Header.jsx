import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { saveRedirectPath } from "../utils/redirect";

const Header = () => {
    const { token, user } = useContext(AuthContext);

    return (
        <header className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="logo">
                    <span className="text-indigo-600">MINI</span>{" "}
                    <span className="text-indigo-600">S</span>OCIAL{" "}
                    <span className="text-indigo-600">N</span>ETWORK
                </div>
                <nav className="flex items-center gap-4">
                    <Link
                        to="/feed"
                        className="text-gray-700 hover:text-indigo-600 transition"
                    >
                        Feed
                    </Link>

                    {user ? (
                        <Link
                            to="/profile"
                            className="text-gray-700 hover:text-indigo-600 transition"
                        >
                            Profile
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                onClick={saveRedirectPath}
                                className="text-gray-700 hover:text-indigo-600 transition"
                            >
                                Вход
                            </Link>
                            <Link
                                to="/register"
                                className="px-3 py-1 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            >
                                Зарегистрироваться
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
