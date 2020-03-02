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
  type: {
    type: String,
    enum: ['deadline', 'fix', 'talk', 'scheduleItem', 'other']
  },
  assignees: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: false,
  }],
  start: Date,
  end: Date,
  tags: [String],
}, schemaOptions);

talkSchema.virtual('isScheduleItem')
  .get(function() {
    return this.format === 'scheduleItem'
  });

const Talk = mongoose.model('Talk', talkSchema);

module.exports = talkSchema;