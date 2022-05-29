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
  const { id } = req.params;
  
  try {
    const updatedProduct = await ProductsService.putProduct({ id, ...req.body });
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  const { id } = req.params;
  
  try {
    await ProductsService.deleteProduct(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
