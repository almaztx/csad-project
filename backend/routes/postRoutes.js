const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, postCtrl.createPost);
router.get("/", postCtrl.getPosts);
router.get("/my", auth, postCtrl.getMyPosts);

module.exports = router;
