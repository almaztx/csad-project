const Post = require("../models/Post");

// создать пост
exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({
            author: req.user,
            text: req.body.text,
        });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// все посты (лента) с автором
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name")
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// посты конкретного пользователя (для профиля)
exports.getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user }).sort({
            createdAt: -1,
        });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
