const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: String,
  members: [String],
  events: [String]
}, { timestamps: true });

module.exports = mongoose.model('club_collection', ClubSchema);
