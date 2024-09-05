const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  interests: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('TestUser', userSchema);
