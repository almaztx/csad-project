import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const register = async (name, email, password) => {
    const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
    });
    return res.data;
};

export const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
};

export const getMe = async (token) => {
    const res = await api.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

let onLogoutCallback = () => {};
export const setLogoutHandler = (callback) => {
    onLogoutCallback = callback;
};
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            console.error(
                "JWT просрочен или недействителен. Выполняется автоматический выход."
            );

            onLogoutCallback();
        }

        return Promise.reject(error);
    }
);
