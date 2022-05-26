const ProductsService = require('../services/ProductsService');

async function getProducts(_req, res) {
  const products = await ProductsService.getProducts();

  res.status(200).json(products);
}

module.exports = {
  getProducts,
};
