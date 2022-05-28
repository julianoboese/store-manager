const Joi = require('joi');

function saleValidation(req, res, next) {
  const schema = Joi.object({
    productId: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required(),
  });

  req.body.forEach((saleProduct) => {
    const { error } = schema.validate(saleProduct);
  
    if (error) {
      next(error.details[0]);
    }
  });

  next();
}

module.exports = saleValidation;
