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
    }
}