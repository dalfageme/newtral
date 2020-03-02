const router = require('express').Router();

const tasksRouter = require('./tasks');
const usersRouter = require('./users');

router.use('/api/tasks', tasksRouter);
router.use('/api/users', usersRouter);

module.exports = router;