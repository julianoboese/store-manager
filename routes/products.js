const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const { productValidation } = require('../middlewares');

const routes = express.Router();

routes.get('/', ProductsController.getProducts);

routes.get('/:id', ProductsController.getProduct);

routes.post('/', productValidation, ProductsController.postProduct);

routes.put('/:id', productValidation, ProductsController.putProduct);

routes.delete('/:id', ProductsController.deleteProduct);

module.exports = routes;
