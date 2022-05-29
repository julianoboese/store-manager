const SalesService = require('../services/SalesService');

async function getSales(_req, res) {
  const sales = await SalesService.getSales();

  res.status(200).json(sales);
}

async function getSale(req, res, next) {
  const { id } = req.params;

  try {
    const sale = await SalesService.getSale(id);
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
}

async function postSale(req, res) {
  const sale = await SalesService.postSale(req.body);
  res.status(201).json(sale);
}

async function putSale(req, res, next) {
  const { id } = req.params;

  try {
    const updatedSale = await SalesService.putSale({ id, saleData: req.body });
    res.status(200).json(updatedSale);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSales,
  getSale,
  postSale,
  putSale,
};
