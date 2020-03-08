const userModel = require('../models/user');
const taskModel = require('../models/task');
const mongoose = require('mongoose');

async function login(req, res){
  let email = req.body.email;
  let password = req.body.password;

  let user = await userModel.findOne({email: email});
  if(!user){
    return res.status(500).send();
  }

  let okPassword = await user.comparePassword(password);

  if (!okPassword) {
    return res.status(404).send({
      error: 'User or password incorrect'
    })
  }

  let token = await user.getJWT();
  res.status(200).send({
    token,
    email,
  })
}

async function register(req, res) {
  // TODO: Check if user exists
  const inserteduser = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  delete inserteduser.password;
  res.status(200).send(inserteduser);
}

async function getUsers(req, res) {
  const users = await userModel.find({}, 'email username');
  res.status(200).send(users);
}

async function getUser(req, res) {
  const user = await userModel.findOne({_id: req.params.id}, 'email username');
  const tasks = await taskModel.find({assignees: mongoose.Types.ObjectId(req.params.id) });
  res.status(200).send({...user.toJSON(), tasks});
}



module.exports = {
  login,
  register,
  getUsers,
  getUser,
}