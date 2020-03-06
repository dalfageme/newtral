const userModel = require('../models/user');

async function login(req, res){
  let email = req.body.email;
  let password = req.body.password;

  let user = await userModel.findOne({email: email});
  if(!user){
    //@TODO this is just temporal a fix
    user = await userModel.create({
      email: email,
      password: password,
      username: email.split('@')[0]
    });
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

module.exports = {
  login,
  register,
  getUsers,
}