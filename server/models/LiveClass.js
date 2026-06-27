const mongoose = require('mongoose');

const liveClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'LIVE', 'COMPLETED'],
    default: 'SCHEDULED'
  },
  scheduledFor: {
    type: Date,
    default: Date.now
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacherName: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('LiveClass', liveClassSchema);
