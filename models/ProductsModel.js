const connection = require('../db/connection');

async function getProducts() {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return products;
}

async function getProduct(id) {
  return id;
}

module.exports = {
  getProducts,
  getProduct,
};
