const Joi = require('joi');

function productValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    next(error.details[0]);
  }

  next();
}

module.exports = productValidation;
