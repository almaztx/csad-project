import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../api/posts";
import { getComments, addComment } from "../api/posts";

export default function PostPage() {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        getPosts().then((res) => {
            const found = res.data.find((p) => p._id === id);
            setPost(found);
        });
        loadComments();
    }, [id]);

    const loadComments = () =>
        getComments(id).then((res) => setComments(res.data));

    const handleComment = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        await addComment(token, id, text);
        setText("");
        loadComments();
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: 12,
                    marginBottom: 12,
                }}
            >
                <p>
                    <strong>{post.author.name}</strong>
                </p>
                <p>{post.text}</p>
                <small>{new Date(post.createdAt).toLocaleString()}</small>
            </div>

            <h3>Comments</h3>
            {comments.map((c) => (
                <div key={c._id} style={{ marginBottom: 6 }}>
                    <strong>
                        {c.author.name}
                        {c.author._id === post.author._id && (
                            <span> (Автор)</span>
                        )}
                    </strong>{" "}
                    {c.text}
                </div>
            ))}

            {token ? (
                <form onSubmit={handleComment} style={{ marginTop: 12 }}>
                    <input
                        placeholder="Add comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={200}
                        style={{ width: "60%" }}
                    />
                    <button type="submit">Send</button>
                </form>
            ) : (
                <p style={{ marginTop: 12 }}>
                    <a href="/login">Войдите</a>, чтобы оставить комментарий.
                </p>
            )}
        </div>
    );
}
