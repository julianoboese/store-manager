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
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );

  return product[0];
}

async function postProduct({ name, quantity }) {
  const [response] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return { id: response.insertId };
}

async function putProduct({ id, name, quantity }) {
  const [response] = await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );

  return { affectedRows: response.affectedRows };
}

module.exports = {
  getProducts,
  getProduct,
  getProductByName,
  postProduct,
  putProduct,
};
