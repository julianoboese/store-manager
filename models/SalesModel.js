const connection = require('../db/connection');

async function getSales() {
  const [sales] = await connection.execute(
    `
    SELECT
      sp.sale_id AS saleId,
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
  return id;
}

module.exports = {
  getSales,
  getSale,
};
