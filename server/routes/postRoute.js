var express = require('express');
var router = express.Router();

var postController = require("../controllers/postController")
var commentController = require("../controllers/commentController")

router.get('/allPosts',postController.allPosts)
router.get('/post/:id',postController.post)
router.get('/postPage/:page',postController.postPage)
router.get('/delete/:id',postController.deletePost)
router.post('/add',postController.addPost)
router.post('/update/:id', postController.updatePost)
router.post('/like/:id',postController.likePost)
router.post('/comment/:id',commentController.addComment)
router.post('/deleteComment/:id',commentController.deleteComment)
module.exports = router;
