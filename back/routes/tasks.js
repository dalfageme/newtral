const express = require('express');
const router = express.Router();

const taskController = require("../controllers/task");
const auth = require("./middlewares/auth");

router.get("/", auth.validToken, auth.isAdmin, taskController.getTasks);
router.get("/:id", auth.validToken, auth.isAdmin,  taskController.getTasks);
router.post("/", auth.validToken, auth.isAdmin,  taskController.createTask);
router.delete("/:id", auth.validToken, auth.isAdmin, taskController.deleteTask);

module.exports = router;