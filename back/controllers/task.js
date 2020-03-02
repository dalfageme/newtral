async function getTasks(req, res) {
  res.status(404).send({message: 'todo get tasks'});
}

async function getTaskById(req, res) {
  res.status(404).send({message: 'todo get task by id'});  
}

async function createTask(req, res) {
  res.status(404).send({message: 'todo create task'});
}

async function deleteTask(req, res) {
  res.status(404).send({message: 'todo create task'});
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  deleteTask
}