const Comment = require("../models/Comment");

const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const comment = await Comment.create({
      blog: req.params.blogId,
      user: req.user.id,
      text,
    });

    await comment.populate("user", "name");

    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addComment, getComments };
