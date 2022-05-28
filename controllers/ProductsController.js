const ProductsService = require('../services/ProductsService');

async function getProducts(_req, res) {
  const products = await ProductsService.getProducts();

  res.status(200).json(products);
}

async function getProduct(req, res) {
  const { id } = req.params;
  
  try {
    const product = await ProductsService.getProduct(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });    
  }
}

async function postProduct(req, res) {
  return { req, res };
}

module.exports = {
  getProducts,
  getProduct,
  postProduct,
};
