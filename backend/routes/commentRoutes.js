const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentController");
const auth = require("../middleware/authMiddleware");

router.post("/:postId/comments", auth, commentCtrl.addComment);
router.get("/:postId/comments", commentCtrl.getComments);
router.delete("/:postId/comments/:commentId", auth, commentCtrl.deleteComment);

module.exports = router;
