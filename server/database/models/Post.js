const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  likes: [String],
  author: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  likes: [String],
  author: { type: String, required: true },
  comments: [commentSchema],
  dateAdded: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
