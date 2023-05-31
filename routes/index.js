const express = require('express');
const users = require('./api/user');
const catalogs = require('./api/catalog');
const products = require('./api/product');
const assets = require('./api/asset');

const routes = express.Router();

routes.use('/api/users', users);
routes.use('/api/catalog', catalogs);
routes.use('/api/products', products);
routes.use('/api/assets', assets);

module.exports = { routes }