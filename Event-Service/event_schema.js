const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: String,
  club: String,
  description: String,
  date: Date
}, { timestamps: true });

module.exports = mongoose.model('event_collection', EventSchema);
