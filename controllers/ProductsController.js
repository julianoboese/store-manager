const ProductsService = require('../services/ProductsService');

async function getProducts(_req, res) {
  const products = await ProductsService.getProducts();
  res.status(200).json(products);
}

async function getProduct(req, res) {
  const { id } = req.params;
  const product = await ProductsService.getProduct(id);
  res.status(200).json(product);
}

async function postProduct(req, res) {
  const newProduct = await ProductsService.postProduct(req.body);
  res.status(201).json(newProduct);
}

async function putProduct(req, res) {
  const { id } = req.params;
  const updatedProduct = await ProductsService.putProduct({ id, ...req.body });
  res.status(200).json(updatedProduct);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  await ProductsService.deleteProduct(id);
  res.status(204).end();
}

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
