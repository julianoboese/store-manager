const SalesService = require('../services/SalesService');

async function getSales(_req, res) {
  const sales = await SalesService.getSales();
  
  res.status(200).json(sales);
}

async function getSale(req, res) {
  const { id } = req.params;
  
  try {
    const sale = await SalesService.getSale(id);
    res.status(200).json(sale);
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });    
  }
}

module.exports = {
  getSales,
  getSale,
};
