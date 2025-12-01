import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCommentCount } from "../api/posts";
import { timeAgo } from "../utils/timeAgo";

export default function PostCardFeed({ post }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        getCommentCount(post._id)
            .then(setCount)
            .catch(() => {});
    }, [post._id]);

    return (
        <Link to={`/post/${post._id}`} className="block group">
            <div
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 
                            transition-all duration-300 ease-out 
                            group-hover:-translate-y-1 p-6"
            >
                {/* Автор */}
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 
                                    rounded-full flex items-center justify-center text-white font-bold text-lg"
                    >
                        {(post.author?.name?.[0] || "я").toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 text-lg">
                            {post.author.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            {timeAgo(post.createdAt)}
                        </p>
                    </div>
                </div>

                {/* Текст поста */}
                <p className="text-gray-800 text-base leading-relaxed mb-5 line-clamp-3">
                    {post.text}
                </p>

                {/* Футер: комментарии */}
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        <span>
                            {count}{" "}
                            {count === 1 ? "комментарий" : "комментариев"}
                        </span>
                    </div>

                    <span
                        className="text-indigo-600 font-medium opacity-0 group-hover:opacity-100 
                                     transition-opacity duration-300"
                    >
                        Читать комментарии →
                    </span>
                </div>
            </div>
        </Link>
    );
}
