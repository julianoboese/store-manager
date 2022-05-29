const connection = require('../db/connection');

async function getSales() {
  const [sales] = await connection.execute(
    `
    SELECT
      s.id AS saleId,
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM
      sales s
      INNER JOIN sales_products sp ON s.id = sp.sale_id
    ORDER BY
      saleId,
      productId;
    `,
  );

  return sales;
}

async function getSale(id) {
  const [sale] = await connection.execute(
    `
    SELECT
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM
      sales s
      INNER JOIN sales_products sp ON s.id = sp.sale_id
    WHERE
      s.id = ?
    ORDER BY
      productId;
    `,
    [id],
  );

  return sale;
}

async function postSaleProduct(id, { productId, quantity }) {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );
}

async function postSale() {
  const [response] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  return { id: response.insertId };
}

async function putSale({ id, productId, quantity }) {
  return { id, productId, quantity };
}

module.exports = {
  getSales,
  getSale,
  postSaleProduct,
  postSale,
  putSale,
};
