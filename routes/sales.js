const express = require('express');
const SalesController = require('../controllers/SalesController');

const routes = express.Router();

routes.get('/', SalesController.getSales);

module.exports = routes;
