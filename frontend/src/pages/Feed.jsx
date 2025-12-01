import { useEffect, useMemo, useState } from "react";
import PostCardFeed from "../components/PostCardFeed";
import { getPosts } from "../api/posts";
import { useSearchParams } from "react-router-dom";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    useEffect(() => {
        getPosts().then((res) => setPosts(res.data));
    }, []);

    const filtered = useMemo(() => {
        if (!query.trim()) return posts;
        return posts.filter((p) =>
            p.text.toLowerCase().includes(query.toLowerCase())
        );
    }, [posts, query]);

    const handleSearch = (e) => {
        const val = e.target.value.trim();
        setSearchParams(val ? { q: val } : {}, { replace: true });
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Заголовок */}
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
                    Посты
                </h2>

                {/* Поиск */}
                <div className="relative mb-10">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Поиск по постам..."
                        value={query}
                        onChange={handleSearch}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm
                                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                   transition-all duration-200 text-gray-800 placeholder-gray-400"
                    />
                </div>

                {/* Пустые состояния */}
                {filtered.length === 0 && !query && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-2xl mb-2">Пока нет постов</p>
                        <p className="text-lg">
                            Будь первым, кто напишет что-нибудь!
                        </p>
                    </div>
                )}

                {filtered.length === 0 && query && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-2xl mb-2">Ничего не найдено</p>
                        <p className="text-lg">
                            По запросу «{query}» постов нет
                        </p>
                    </div>
                )}

                {/* Список постов */}
                <div className="space-y-6">
                    {filtered.map((p) => (
                        <PostCardFeed key={p._id} post={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}
