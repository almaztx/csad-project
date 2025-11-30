import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getComments, addComment } from "../api/posts";

export default function PostCard({ post }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const { token } = useContext(AuthContext);

    useEffect(() => {
        getComments(post._id).then((res) => setComments(res.data));
    }, [post._id]);

    const handleComment = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        await addComment(token, post._id, text);
        setText("");
        const res = await getComments(post._id);
        setComments(res.data);
    };

    return (
        <div
            style={{ border: "1px solid #ccc", padding: 12, marginBottom: 12 }}
        >
            <p>
                <strong>{post.author.name}</strong>
            </p>
            <p>{post.text}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>

            <details>
                <summary>Comments ({comments.length})</summary>
                {comments.map((c) => (
                    <div key={c._id} style={{ marginTop: 6 }}>
                        <strong>{c.author.name}:</strong> {c.text}
                    </div>
                ))}
                {token && (
                    <form onSubmit={handleComment} style={{ marginTop: 6 }}>
                        <input
                            placeholder="Add comment..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            maxLength={200}
                        />
                        <button type="submit">Send</button>
                    </form>
                )}
            </details>
        </div>
    );
}
