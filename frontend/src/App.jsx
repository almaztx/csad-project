import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import PostPage from "./pages/PostPage";
import { AppRoute } from "./utils/AppRoute";
import Header from "./components/Header";
import { Footer } from "./components/Footer";

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
        // <Routes>
        //     <Route
        //         path="/register"
        //         element={
        //             <RedirectIfAuthenticated>
        //                 <Register />
        //             </RedirectIfAuthenticated>
        //         }
        //     />
        //     <Route
        //         path="/login"
        //         element={
        //             <RedirectIfAuthenticated>
        //                 <Login />
        //             </RedirectIfAuthenticated>
        //         }
        //     />
        //     <Route
        //         path="/dashboard"
        //         element={
        //             <ProtectedRoute>
        //                 <Dashboard />
        //             </ProtectedRoute>
        //         }
        //     />
        //     <Route path="/" element={<Navigate to="/dashboard" />} />

        //     <Route path="/feed" element={<Feed />} />
        //     <Route
        //         path="/profile"
        //         element={
        //             <ProtectedRoute>
        //                 <Profile />
        //             </ProtectedRoute>
        //         }
        //     />
        //     <Route path="/post/:id" element={<PostPage />} />
        // </Routes>
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 mt-18 mb-10 md:mt-10">
                <AppRoute />
            </main>

            <Footer />
        </div>
    );
}

export default App;
