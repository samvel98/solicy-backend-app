const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  cost1: {
    type: Number
  },
  cost2: {
    type: Number
  },
  cost3: {
    type: Number
  },
  req1: {
    type: Number
  },
  req2: {
    type: Number
  },
  req3: {
    type: Number
  },
  category: {
    type: Number
  },
});

catalogSchema.virtual('price').get(function () {
  return {
    cost1: this.cost1,
    cost2: this.cost2,
    cost3: this.cost3,
  };
});
catalogSchema.virtual('req').get(function () {
  return {
    req1: this.req1,
    req2: this.req2,
    req3: this.req3,
  };
});

const Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = Catalog