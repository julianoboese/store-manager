const ProductsModel = require('../models/ProductsModel');

async function getProducts() {
  const products = await ProductsModel.getProducts();

  return products;
}

module.exports = {
  getProducts,
};
