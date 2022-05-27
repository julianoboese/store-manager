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
    res.status(404).json({ message: error.message });    
  }
}

module.exports = {
  getProducts,
  getProduct,
};
