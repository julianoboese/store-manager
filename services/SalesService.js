const SalesModel = require('../models/SalesModel');

async function getSales() {
  const sales = await SalesModel.getSales();

  return sales;
}

module.exports = {
  getSales,
};
