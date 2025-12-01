import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createPost } from "../api/posts";

export default function CreatePost({ onCreated }) {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { token, user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() || isLoading) return;

        setIsLoading(true);
        try {
            await createPost(token, text.trim());
            setText("");
            onCreated?.();
        } catch (err) {
            console.error("Ошибка при создании поста");
        } finally {
            setIsLoading(false);
        }
    };

    const remaining = 500 - text.length;

    return (
        <div
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 
                        transition-all duration-300 hover:shadow-lg"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <textarea
                        placeholder="О чём думаете?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={500}
                        rows={4}
                        disabled={isLoading}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl 
                                       resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                       focus:border-transparent transition-all duration-200 
                                       placeholder-gray-400 text-gray-800 text-base leading-relaxed
                                       disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Футер: счётчик + кнопка */}
                <div className="flex justify-between items-center px-1">
                    <span
                        className={`text-sm font-medium transition-colors
                        ${
                            remaining <= 50
                                ? "text-red-500"
                                : remaining <= 100
                                ? "text-orange-500"
                                : "text-gray-500"
                        }
                    `}
                    >
                        {remaining} / 500
                    </span>

                    <button
                        type="submit"
                        disabled={!text.trim() || isLoading}
                        className="px-7 py-3 bg-indigo-500
                                   disabled:from-gray-400 disabled:to-gray-500 
                                   disabled:cursor-not-allowed text-white font-semibold 
                                   rounded-xl shadow-md hover:shadow-xl 
                                   transition-all duration-300 active:scale-95 
                                   flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="w-5 h-5 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Публикация...
                            </>
                        ) : (
                            "Опубликовать"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
