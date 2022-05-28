const SalesModel = require('../models/SalesModel');

async function getSales() {
  const sales = await SalesModel.getSales();

  return sales;
}

async function getSale(id) {
  return id;
}

module.exports = {
  getSales,
  getSale,
};
