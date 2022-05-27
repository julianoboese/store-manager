const createError = require('http-errors');
const ProductsModel = require('../models/ProductsModel');

async function getProducts() {
  const products = await ProductsModel.getProducts();

  return products;
}

async function getProduct(id) {
  const product = await ProductsModel.getProduct(id);
  
  if (!product) throw new createError.NotFound('Product not found');
  
  return product;
}

module.exports = {
  getProducts,
  getProduct,
};