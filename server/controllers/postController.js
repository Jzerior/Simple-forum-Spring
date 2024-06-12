const Post = require("../database/models/Post");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

module.exports = {
    async addPost(req,res) {
        const {name, content, author} = req.body;
        const likes = []
        const comments = []
        try{
            const post = new Post({
                name,
                content,
                author,
                likes,
                comments
            })
            await post.save()

            res.status(200).json({
                status: 200,
                message: "Post was added successfully",
            });
        }catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message.toString(),
            });
        }
    },
    async updatePost(req, res) {
        const { id } = req.params;
        const { name, content, author } = req.body;

        try {
            const post = await Post.findByIdAndUpdate(
                id,
                { name, content, author },
                { new: true, fields: '-likes -comments' }
            );

            if (!post) {
                return res.status(404).json({
                    status: 404,
                    message: "Post not found",
                });
            }

            res.status(200).json({
                status: 200,
                message: "Post was updated successfully",
                data: post,
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message.toString(),
            });
        }
    },
    async allPosts(req,res){
        try {
            const posts = await Post.find();
            res.status(200).json({
                status: 200,
                data: posts,
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message.toString(),
            });
        }
    },
    async likePost(req, res) {
        const { id } = req.params;
        const { login } = req.body;

        try {
            const post = await Post.findById(id);
            if (!post) {
                return res.status(404).json({
                    status: 404,
                    message: "Post not found",
                });
            }
            if (login) {
                if (!post.likes.includes(login)){
                    post.likes.push(login);
                }
                else{
                    post.likes.pop(login);
                }
            }
            const updatedPost = await post.save();
            res.status(200).json({
                status: 200,
                message: "Player updated successfully",
                data: updatedPost
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message,
            });
        }
    },
}