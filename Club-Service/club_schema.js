const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  leaderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to 'User' in person_schema
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Club', ClubSchema);
