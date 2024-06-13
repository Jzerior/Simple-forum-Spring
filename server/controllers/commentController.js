const Post = require("../database/models/Post");
const mongoose = require('mongoose');

module.exports = {
    async addComment(req, res) {
        const { id } = req.params;
        const { content, author } = req.body;
    
        try {
          const post = await Post.findById(id);
          if (!post) {
            return res.status(404).json({
              status: 404,
              message: "Post not found",
            });
          }
    
          const newComment = {
            content,
            author,
            likes: []
          };
    
          post.comments.push(newComment);
          await post.save();
    
          res.status(200).json({
            status: 200,
            message: "Comment added successfully",
            data: post.comments[post.comments.length - 1],
          });
        } catch (err) {
          res.status(400).json({
            status: 400,
            message: err.message.toString(),
          });
        }
      },
      async deleteComment(req, res) {
        const { id  } = req.params;
        const {commentId} = req.body;
    
        try {
          const post = await Post.findById(id);
          if (!post) {
            return res.status(404).json({
              status: 404,
              message: "Post not found",
            });
          }
          console.log(req.body)
          const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
          if (commentIndex === -1) {
            return res.status(404).json({
              status: 404,
              message: "Comment not found",
            });
          }
    
          post.comments.splice(commentIndex, 1);
          await post.save();
    
          res.status(200).json({
            status: 200,
            message: "Comment deleted successfully",
          });
        } catch (err) {
          res.status(400).json({
            status: 400,
            message: err.message.toString(),
          });
        }
      },
}