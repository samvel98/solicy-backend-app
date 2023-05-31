const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    ref: 'assets',
    unique: true
  },
  cash1: {
    type: Number
  },
  cash2: {
    type: Number
  },
  cash3: {
    type: Number
  },
});

userSchema.virtual('asset', {
  ref: 'assets',
  localField: 'address',
  foreignField: 'address',
  justOne: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User 