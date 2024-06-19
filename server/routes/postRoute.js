var express = require('express');
var router = express.Router();

var postController = require("../controllers/postController")
var commentController = require("../controllers/commentController")
var authController = require("../controllers/authController")
router.get('/allPosts',postController.allPosts)
router.get('/post/:id',postController.post)
router.get('/postPage/:page',postController.postPage)
router.get('/delete/:id',authController.verifyToken,postController.deletePost)
router.post('/add',postController.addPost)
router.post('/update/:id',authController.verifyToken, postController.updatePost)
router.post('/like/:id',authController.verifyToken,postController.likePost)
router.post('/comment/:id',authController.verifyToken,commentController.addComment)
router.post('/deleteComment/:id',authController.verifyToken,commentController.deleteComment)
module.exports = router;
