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

    return (
        <div>
            <h2>Feed</h2>
            <input
                placeholder="Поиск по постам..."
                value={query}
                onChange={(e) => {
                    const val = e.target.value;
                    setSearchParams(val ? { q: val } : {}); // обновляем URL
                }}
                style={{ marginBottom: 16, width: "100%" }}
            />
            {/* {posts.map((p) => (
                <PostCardFeed key={p._id} post={p} />
            ))} */}

            {filtered.length === 0 && !query && (
                <p>📭 Пока нет постов — будь первым!</p>
            )}
            {filtered.length === 0 && query && (
                <p>🔍 Нет постов по запросу «{query}»</p>
            )}

            {filtered.map((p) => (
                <PostCardFeed key={p._id} post={p} />
            ))}
        </div>
    );
}
