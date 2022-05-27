const SalesService = require('../services/SalesService');

async function getSales(_req, res) {
  const sales = await SalesService.getSales();
  
  res.status(200).json(sales);
}

module.exports = {
  getSales,
};
