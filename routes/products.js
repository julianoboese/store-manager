const express = require('express');
const ProductsController = require('../controllers/ProductsController');

const routes = express.Router();

routes.get('/', ProductsController.getProducts);

routes.get('/:id', ProductsController.getProduct);

module.exports = routes;
