import PostCard from "./PostCard";

export default function PostList({ posts }) {
    if (!posts.length) return <p>No posts yet.</p>;
    return (
        <>
            {posts.map((p) => (
                <PostCard key={p._id} post={p} />
            ))}
        </>
    );
}
