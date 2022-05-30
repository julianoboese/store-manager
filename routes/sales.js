const express = require('express');
const SalesController = require('../controllers/SalesController');
const { saleValidation } = require('../middlewares');

const routes = express.Router();

routes.get('/', SalesController.getSales);

routes.get('/:id', SalesController.getSale);

routes.post('/', saleValidation, SalesController.postSale);

routes.put('/:id', saleValidation, SalesController.putSale);

routes.delete('/:id', SalesController.deleteSale);

module.exports = routes;
