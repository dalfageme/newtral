const taskModel = require('../models/task');

async function getTasks(req, res) {
  try {
    const tasks = await taskModel.find();
    res.status(200).send(tasks);
  } catch(err) {
    res.status(500).send({ message: 'unexpected error' });
  }
}

async function getTaskById(req, res) {
  const id = req.params.id;

  try {
    const task = await taskModel.findById(id);
    res.status(200).send(task);
  } catch(err) {
    res.status(500).send({ message: 'unexpected error' });
  }
}

async function saveTask(req, res) {
  const taskBody = req.body.task;
  let task;
  try {
    if (taskBody._id) {
      task = await taskModel.updateOne({_id: taskBody._id}, taskBody);
    } else {
      task = new taskModel(taskBody);
      await task.validate();
      await task.save();
    }
    return res.status(200).send(task);
  } catch(err) {
    console.log(err);
    return res.status(400).send({ message: 'cannot save task'});
  }
}

async function deleteTask(req, res) {
  const id = req.params.id;
  try {
    var removed = taskModel.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).send({ message: 'cannot delete task' });
    }

    return res.status(200).send();
  } catch (err) {
    return res.status(404).send({ message: 'cannot delete task' });
  }

  
}

module.exports = {
  getTasks,
  getTaskById,
  saveTask,
  deleteTask
}