const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
    trim: true,
    minlength: 2,
    maxlength: 400,
  },
  description: {
    type: String,
    required: false,
  },
  assignees: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: false,
  }],
  start: Date,
  end: Date,
  tags: [String],
});

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;
