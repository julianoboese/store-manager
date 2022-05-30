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
  const sale = await SalesModel.getSale(id);

  if (sale.length === 0) throw new createError.NotFound('Sale not found');

  await Promise.all(saleData.map((saleProduct) => SalesModel.putSale({ id, ...saleProduct })));

  return { saleId: id, itemUpdated: saleData };
}

async function deleteSale(id) {
  const sale = await SalesModel.getSale(id);

  if (sale.length === 0) throw new createError.NotFound('Sale not found');

  await Promise.all([SalesModel.deleteSaleProduct(id), SalesModel.deleteSale(id)]);
}

module.exports = {
  getSales,
  getSale,
  postSale,
  putSale,
  deleteSale,
};
