var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/authController')
var ValidationController = require('../controllers/validationController')

router.post('/register',
  ValidateController.validateRegister,
  ValidateController.checkValidation,
  AuthController.register
)
router.post('/login', AuthController.login)

module.exports = router;
