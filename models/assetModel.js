const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
  type: {
    type: Number,
    enum: [1, 2, 3]
  },
  level: {
    type: Number,
    min: 1,
    max: 10
  },
  address: {
    type: String,
    ref: 'User'
  },
});

assetSchema.virtual('users', {
  ref: 'users',
  localField: 'address',
  foreignField: 'address',
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset