const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active'
  }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
