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
        <Link to={`/post/${post._id}`}>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: 12,
                    marginBottom: 12,
                    display: "block",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                <p>
                    <strong>{post.author.name}</strong>
                </p>
                <p>{post.text}</p>
                <small>{timeAgo(post.createdAt)}</small>
                <div style={{ marginTop: 8 }}>💬 {count} комментариев</div>
            </div>
        </Link>
    );
}
