const SalesService = require('../services/SalesService');

async function getSales(_req, res) {
  const sales = await SalesService.getSales();
  res.status(200).json(sales);
}

async function getSale(req, res) {
  const { id } = req.params;
  const sale = await SalesService.getSale(id);
  res.status(200).json(sale);
}

async function postSale(req, res) {
  const sale = await SalesService.postSale(req.body);
  res.status(201).json(sale);    
}

async function putSale(req, res) {
  const { id } = req.params;
  const updatedSale = await SalesService.putSale({ id, saleData: req.body });
  res.status(200).json(updatedSale);
}

async function deleteSale(req, res) {
  const { id } = req.params;
  await SalesService.deleteSale(id);
  res.status(204).end();
}

module.exports = {
  getSales,
  getSale,
  postSale,
  putSale,
  deleteSale,
};
