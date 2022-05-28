const express = require('express');
const SalesController = require('../controllers/SalesController');
const { saleValidation } = require('../middlewares');

const routes = express.Router();

routes.get('/', SalesController.getSales);

routes.get('/:id', SalesController.getSale);

routes.post('/', saleValidation);

routes.put('/:id', saleValidation);

module.exports = routes;
