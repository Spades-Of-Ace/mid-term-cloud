const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    enum: ['good', 'damaged', 'lost'],
    default: 'good'
  },
  acquiredDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);
