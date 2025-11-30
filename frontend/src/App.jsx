import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function ProtectedRoute({ children }) {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
}

function RedirectIfAuthenticated({ children }) {
    const { token } = useContext(AuthContext);
    return token ? <Navigate to="/dashboard" replace /> : children;
}

function App() {
    return (
        <Routes>
            <Route
                path="/register"
                element={
                    <RedirectIfAuthenticated>
                        <Register />
                    </RedirectIfAuthenticated>
                }
            />
            <Route
                path="/login"
                element={
                    <RedirectIfAuthenticated>
                        <Login />
                    </RedirectIfAuthenticated>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}

export default App;
