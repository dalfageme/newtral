const router = require('express').Router();

var userController = require('../controllers/user');
const auth = require("./middlewares/auth");

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/:id', auth.validToken ,userController.getUser);
router.get('/', auth.validToken, userController.getUsers);

module.exports = router;