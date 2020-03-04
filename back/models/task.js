const mongoose = require('mongoose');

const talkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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

const talkModel = mongoose.model('talk', talkSchema);

module.exports = talkModel;
