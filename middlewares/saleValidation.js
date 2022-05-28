const Joi = require('joi');

function saleValidation(req, res, next) {
  const schema = Joi.object({
    productId: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required(),
  });

  req.body.forEach((saleProduct) => {
    const { error } = schema.validate(saleProduct);
  
    if (error) {
      const statusCode = error.details[0].type === 'any.required' ? 400 : 422;
      res.status(statusCode).json({ message: error.details[0].message });
    }
  });

  next();
}

module.exports = saleValidation;
