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
  const { id } = await SalesModel.postSale();

  await Promise.all(sale.map((saleProduct) => SalesModel.postSaleProduct(id, saleProduct)));

  return { id, itemsSold: sale };
}

async function putSale({ id, saleData }) {
  return { id, saleData };
}

module.exports = {
  getSales,
  getSale,
  postSale,
  putSale,
};
