import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";
import { getMyPosts } from "../api/posts";

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const { token } = useContext(AuthContext);

    const load = () => getMyPosts(token).then((res) => setPosts(res.data));

    useEffect(() => {
        load();
    }, [token]);

    return (
        <div>
            <h2>My Posts</h2>
            <CreatePost onCreated={load} />
            <PostList posts={posts} />
        </div>
    );
}
