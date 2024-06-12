var express = require('express');
var router = express.Router();

var postController = require("../controllers/postController")

router.post('/add',postController.addPost)
router.get('/allPosts',postController.allPosts)
router.put('/posts/:id', postController.updatePost)

module.exports = router;
