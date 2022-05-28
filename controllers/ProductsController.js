const ProductsService = require('../services/ProductsService');

async function getProducts(_req, res) {
  const products = await ProductsService.getProducts();

  res.status(200).json(products);
}

async function getProduct(req, res, next) {
  const { id } = req.params;
  
  try {
    const product = await ProductsService.getProduct(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function postProduct(req, res, next) {
  try {
    const newProduct = await ProductsService.postProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
}

async function putProduct(req, res, next) {
  return { req, res, next };
}

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
};
