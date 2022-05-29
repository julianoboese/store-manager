const createError = require('http-errors');
const SalesModel = require('../models/SalesModel');

async function getSales() {
  const sales = await SalesModel.getSales();

  return sales;
}

async function getSale(id) {
  const sale = await SalesModel.getSale(id);

  if (sale.length === 0) throw new createError.NotFound('Sale not found');

  return sale;
}

async function postSale(sale) {
  return sale;
}

module.exports = {
  getSales,
  getSale,
  postSale,
};
