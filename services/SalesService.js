const createError = require('http-errors');
const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');

async function getSales() {
  const sales = await SalesModel.getSales();

  return sales;
}

async function getSale(id) {
  const sale = await SalesModel.getSale(id);

  if (sale.length === 0) throw new createError.NotFound('Sale not found');

  return sale;
}

async function postSale(sale) {
  const saleProducts = await Promise.all(sale
    .map(({ productId }) => ProductsModel.getProduct(productId)));

  const noStock = sale.some(({ productId, quantity }) => {
    const { quantity: currentStock } = saleProducts
      .find((saleProduct) => saleProduct.id === productId);

    return quantity >= currentStock;
  });

  if (noStock) throw new createError.UnprocessableEntity('Such amount is not permitted to sell');

  const { id } = await SalesModel.postSale();

  const postSaleProductPromises = sale
    .map((saleProduct) => SalesModel.postSaleProduct(id, saleProduct));

  const putProductPromises = sale
    .map(({ productId, quantity }) => (
      ProductsModel.putProduct({ id: productId, quantity, sale: 'post' })
  ));

  await Promise.all([...postSaleProductPromises, ...putProductPromises]);

  return { id, itemsSold: sale };
}

async function putSale({ id, saleData }) {
  const sale = await SalesModel.getSale(id);

  if (sale.length === 0) throw new createError.NotFound('Sale not found');

  await Promise.all(saleData.map((saleProduct) => SalesModel.putSale({ id, ...saleProduct })));

  return { saleId: id, itemUpdated: saleData };
}

async function deleteSale(id) {
  const sale = await SalesModel.getSale(id);

  if (sale.length === 0) throw new createError.NotFound('Sale not found');

  const putProductPromises = sale
    .map(({ productId, quantity }) => (
      ProductsModel.putProduct({ id: productId, quantity, sale: 'delete' })
  ));

  await Promise.all([SalesModel.deleteSaleProduct(id), SalesModel.deleteSale(id),
    ...putProductPromises]);
}

module.exports = {
  getSales,
  getSale,
  postSale,
  putSale,
  deleteSale,
};
