const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const privateKey = require('../config/privKey');

const SALT_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 12,
  },
  name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  surname: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    validate: validator.isEmail,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  }
});

UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, SALT_FACTOR, function (err, hash) {
    if (err) return next(err);

    // override the cleartext password with the hashed one
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  let result = await bcrypt.compare(candidatePassword, this.password);
  return result;
};


UserSchema.methods.getJWT = function () {
  return new Promise((resolve, reject) => {
    let user = {
      username: this.username,
      email: this.email,
      role: this.role
    };

    jwt.sign(user, privateKey, { expiresIn: '2h' }, function (err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    })

  })
}


const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;