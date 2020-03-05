const router = require('express').Router();

const taskController = require("../controllers/task");
const auth = require("./middlewares/auth");

router.get("/", auth.validToken, taskController.getTasks);
router.get("/:id", auth.validToken,  taskController.getTasks);
router.post("/", auth.validToken,  taskController.saveTask);
router.delete("/:id", auth.validToken, taskController.deleteTask);

module.exports = router;