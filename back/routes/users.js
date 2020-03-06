const router = require('express').Router();

var userController = require('../controllers/user');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/:id', userController.getUser);
router.get('/', userController.getUsers);

module.exports = router;