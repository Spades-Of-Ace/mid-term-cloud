const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  eventId: String,
  amount: Number,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('budget_collection', BudgetSchema);
