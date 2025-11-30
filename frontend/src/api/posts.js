import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authHeader = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
});

export const createPost = (token, text) =>
    axios.post(`${API_URL}/posts`, { text }, authHeader(token));

export const getPosts = () => axios.get(`${API_URL}/posts`);

export const getMyPosts = (token) =>
    axios.get(`${API_URL}/posts/my`, authHeader(token));

export const getComments = (postId) =>
    axios.get(`${API_URL}/posts/${postId}/comments`);

export const addComment = (token, postId, text) =>
    axios.post(
        `${API_URL}/posts/${postId}/comments`,
        { text },
        authHeader(token)
    );

export const getCommentCount = (postId) =>
    axios
        .get(`${API_URL}/posts/${postId}/comments`)
        .then((res) => res.data.length);
