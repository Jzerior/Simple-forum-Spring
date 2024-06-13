var express = require('express');
var router = express.Router();

var postController = require("../controllers/postController")

router.get('/allPosts',postController.allPosts)
router.get('/post/:id',postController.post)
router.get('/postPage/:page',postController.postPage)
router.post('/add',postController.addPost)
router.post('/update/:id', postController.updatePost)
router.post('/like/:id',postController.likePost)
router.get('/delete/:id',postController.deletePost)

module.exports = router;
