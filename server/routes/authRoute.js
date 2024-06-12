var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/authController')

router.post('/register',AuthController.register)
router.post('/login', AuthController.login)

module.exports = router;
