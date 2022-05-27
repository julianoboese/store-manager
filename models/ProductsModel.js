const connection = require('../db/connection');

async function getProducts() {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return products;
}

async function getProduct(id) {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return product[0];
}

module.exports = {
  getProducts,
  getProduct,
};
