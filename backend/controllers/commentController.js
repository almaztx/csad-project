const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            post: req.params.postId,
            author: req.user,
            text: req.body.text,
        });
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate("author", "name")
            .sort({ createdAt: 1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
