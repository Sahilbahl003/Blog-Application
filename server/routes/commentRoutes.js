const express = require("express");
const router = express.Router();
const {addComment,getComments} = require("../controllers/commentController");
const { auth } = require("../middlewares/auth.js");



router.post("/:blogId", auth, addComment);
router.get("/:blogId", getComments);

module.exports = router;