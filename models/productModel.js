const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  address: {
    type: String,
    ref: 'User'
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product 