const ProductsModel = require('../models/ProductsModel');

async function getProducts() {
  const products = await ProductsModel.getProducts();

  return products;
}

async function getProduct(id) {
  return id;
}

module.exports = {
  getProducts,
  getProduct,
};
