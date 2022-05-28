const connection = require('../db/connection');

async function getProducts() {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );

  return products;
}

async function getProduct(id) {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );

  return product[0];
}

async function getProductByName(name) {
  return name;
}

async function postProduct(name, quantity) {
  return { name, quantity };
}

module.exports = {
  getProducts,
  getProduct,
  getProductByName,
  postProduct,
};
