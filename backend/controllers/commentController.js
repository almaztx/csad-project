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

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ msg: "Comment not found" });

        if (comment.author.toString() !== req.user) {
            return res.status(403).json({ msg: "Not your comment" });
        }

        await Comment.findByIdAndDelete(req.params.commentId);
        res.json({ msg: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
