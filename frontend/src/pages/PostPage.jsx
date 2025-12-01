import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getPosts, getComments, addComment, deleteComment } from "../api/posts";
import { saveRedirectPath } from "../utils/redirect";
import { timeAgo } from "../utils/timeAgo";

export default function PostPage() {
    const { id } = useParams();
    const { token, user } = useContext(AuthContext);

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        getPosts().then((res) => {
            const found = res.data.find((p) => p._id === id);
            setPost(found);
        });
        loadComments();
    }, [id]);

    const loadComments = () => {
        getComments(id).then((res) => setComments(res.data));
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!text.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await addComment(token, id, text.trim());
            setText("");
            loadComments();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (commentId) => {
        if (!confirm("Удалить комментарий?")) return;
        await deleteComment(token, id, commentId);
        loadComments();
    };

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-500">Загрузка...</div>
            </div>
        );
    }

    const isAuthor = user?._id === post.author._id;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* === Основной пост === */}
                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {/* Автор + аватар */}
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-600 
                                            rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                            >
                                {post.author.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-900">
                                    {post.author.name}
                                    {isAuthor && (
                                        <span
                                            className="ml-2 inline-block px-2 py-0.5 text-xs font-medium 
                                                         bg-indigo-100 text-indigo-700 rounded-full"
                                        >
                                            Автор
                                        </span>
                                    )}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {timeAgo(post.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Текст поста */}
                        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {post.text}
                        </div>

                        {/* Дата внизу */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                Опубликовано{" "}
                                {new Date(post.createdAt).toLocaleString(
                                    "ru-RU"
                                )}
                            </p>
                        </div>
                    </div>
                </article>

                {/* === Комментарии === */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Комментарии{" "}
                        <span className="text-indigo-600">
                            ({comments.length})
                        </span>
                    </h2>

                    {/* Список комментариев */}
                    {comments.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-lg">Пока нет комментариев</p>
                            <p className="text-sm mt-1">Станьте первым!</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {comments.map((c) => {
                                const isCommentAuthor =
                                    user?._id === c.author._id;
                                const isPostAuthor =
                                    c.author._id === post.author._id;

                                return (
                                    <div
                                        key={c._id}
                                        className="flex gap-4 group hover:bg-gray-50 -mx-4 px-4 py-3 rounded-xl transition-colors"
                                    >
                                        {/* Аватар комментария */}
                                        <div
                                            className="w-10 h-10 bg-linear-to-br from-indigo-400 to-purple-500 
                                                        rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                                        >
                                            {c.author.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-gray-900">
                                                    {c.author.name}
                                                </span>
                                                {isPostAuthor && (
                                                    <span className="text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                                                        Автор поста
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-400">
                                                    {timeAgo(c.createdAt)}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 text-base wrap-break-words">
                                                {c.text}
                                            </p>
                                        </div>

                                        {/* Кнопка удаления */}
                                        {isCommentAuthor && (
                                            <button
                                                onClick={() =>
                                                    handleDelete(c._id)
                                                }
                                                className="opacity-0 group-hover:opacity-100 transition-opacity 
                                                           text-red-500 hover:text-red-700 text-sm"
                                                title="Удалить"
                                            >
                                                Удалить
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* === Форма добавления комментария === */}
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        {token ? (
                            <form
                                onSubmit={handleComment}
                                className="flex flex-col sm:flex-row gap-3"
                            >
                                <input
                                    type="text"
                                    placeholder="Напишите комментарий..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    maxLength={500}
                                    disabled={isSubmitting}
                                    className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                               focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                               focus:border-transparent transition-all text-gray-800 
                                               placeholder-gray-400 disabled:opacity-60"
                                />
                                <button
                                    type="submit"
                                    disabled={!text.trim() || isSubmitting}
                                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 
                                               disabled:cursor-not-allowed text-white font-medium rounded-xl 
                                               transition-all duration-200 shadow-md hover:shadow-lg 
                                               active:scale-95 whitespace-nowrap"
                                >
                                    {isSubmitting ? "Отправка..." : "Отправить"}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-gray-600">
                                    <Link
                                        to="/login"
                                        onClick={saveRedirectPath}
                                        className="text-indigo-600 hover:text-indigo-700 font-medium underline-offset-4 hover:underline"
                                    >
                                        Войдите в аккаунт
                                    </Link>
                                    , чтобы оставить комментарий
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
