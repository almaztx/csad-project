import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMe } from "../api/auth";

export default function Dashboard() {
    const { token, logout } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            getMe(token)
                .then(setUser)
                .catch(() => alert("Failed to load user"));
        }
    }, [token]);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h2>Welcome {user.name}! You are logged in.</h2>
            <p>Token: {token?.slice(0, 20)}...</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
