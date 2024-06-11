var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/authController')

router.post('/register',
  //ValidateController.validateRegister,
  //ValidateController.checkValidation,
  AuthController.register
)
router.get('/test',(req,res) => {
    res.json({status:201})
  })
router.post('/login', AuthController.login)

module.exports = router;
