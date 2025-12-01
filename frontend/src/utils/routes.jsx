import Profile from "../pages/Profile";
import Feed from "../pages/Feed";
import PostPage from "../pages/PostPage";
import Login from "../components/Login";
import Register from "../components/Register";

import { REGISTER, LOGIN, PROFILE, FEED, POST_PAGE } from "./consts";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to={LOGIN} replace />;
};

const RedirectAuth = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? <Navigate to={PROFILE} replace /> : children;
};

export const routes = [
    {
        path: REGISTER,
        element: (
            <RedirectAuth>
                <Register />
            </RedirectAuth>
        ),
    },
    {
        path: LOGIN,
        element: (
            <RedirectAuth>
                <Login />
            </RedirectAuth>
        ),
    },
    {
        path: PROFILE,
        element: (
            <Protected>
                <Profile />
            </Protected>
        ),
    },
    { path: FEED, element: <Feed /> },
    { path: POST_PAGE, element: <PostPage /> },
];
