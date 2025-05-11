const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Weapons', 'Electronics', 'Uniform', 'Navigation', 'Communication', 'Medical', 'Other']
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  problem: {
    type: String,
    default: 'None'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);