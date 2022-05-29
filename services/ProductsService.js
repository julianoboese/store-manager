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

async function postProduct({ name, quantity }) {
  const product = await ProductsModel.getProductByName(name);
  
  if (product) throw new createError.Conflict('Product already exists');

  const newId = await ProductsModel.postProduct({ name, quantity });

  return { ...newId, name, quantity };
}

async function putProduct({ id, name, quantity }) {
  const product = await ProductsModel.getProduct(id);

  if (!product) throw new createError.NotFound('Product not found');

  await ProductsModel.putProduct({ id, name, quantity });

  return { id, name, quantity };
}

async function deleteProduct(id) {
  const product = await ProductsModel.getProduct(id);

  if (!product) throw new createError.NotFound('Product not found');

  await ProductsModel.deleteProduct(id);
}

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
