import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createPost } from "../api/posts";

export default function CreatePost({ onCreated }) {
    const [text, setText] = useState("");
    const { token } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        await createPost(token, text);
        setText("");
        onCreated?.();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
            <textarea
                placeholder="What's on your mind?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={500}
                rows={3}
                style={{ width: "100%" }}
            />
            <button type="submit">Post</button>
        </form>
    );
}
