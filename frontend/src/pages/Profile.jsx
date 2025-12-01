import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CreatePost from "../components/CreatePost";
import { getMyPosts } from "../api/posts";
import { getMe } from "../api/auth";
import PostCardFeed from "../components/PostCardFeed";

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const { token, logout } = useContext(AuthContext);

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            getMe(token)
                .then(setUser)
                .catch(() => alert("Failed to load user"));
        }
    }, [token]);

    const load = () => getMyPosts(token).then((res) => setPosts(res.data));

    useEffect(() => {
        load();
    }, [token]);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-xl text-gray-600">Загрузка профиля...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Шапка профиля */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                            <div
                                className="w-24 h-24 bg-linear-to-br from-indigo-500 to-purple-600 
                                            rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg"
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {user.name}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Личный профиль
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Постов:{" "}
                                    <span className="font-semibold text-indigo-600">
                                        {posts.length}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium 
                                       rounded-xl transition-all duration-200 shadow-md hover:shadow-lg 
                                       active:scale-95"
                        >
                            Выйти
                        </button>
                    </div>
                </div>

                {/* Создать пост */}
                <CreatePost onCreated={load} />

                {/* Список постов */}
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
                    Мой Посты
                </h2>
                {posts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <p className="text-2xl text-gray-500 mb-3">
                            У вас ещё нет постов
                        </p>
                        <p className="text-gray-400">
                            Напишите что-нибудь выше — и оно появится здесь!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <PostCardFeed
                                key={post._id}
                                post={post}
                                onCommentAdded={load}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
