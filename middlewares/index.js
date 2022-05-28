const productValidation = require('./productValidation');
const saleValidation = require('./saleValidation');
const errorMiddleware = require('./error');

module.exports = {
  productValidation,
  saleValidation,
  errorMiddleware,
};
