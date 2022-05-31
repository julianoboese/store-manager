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

async function putProduct({ id, name, quantity, sale }) {
  let query = name ? 'UPDATE products SET name = ?, ' : 'UPDATE products SET ';

  switch (sale) {
    case 'post': 
      query += 'quantity = quantity - ? ';
      break;
    case 'delete':
      query += 'quantity = quantity + ? ';
      break;
    default:
      query += 'quantity = ? ';
  }

  query += 'WHERE id = ?';

  const params = name ? [name, quantity, id] : [quantity, id];

  const [response] = await connection.execute(query, params);

  return { affectedRows: response.affectedRows };
}

async function deleteProduct(id) {
  const [response] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );

  return { affectedRows: response.affectedRows };
}

module.exports = {
  getProducts,
  getProduct,
  getProductByName,
  postProduct,
  putProduct,
  deleteProduct,
};
