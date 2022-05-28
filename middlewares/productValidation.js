const Joi = require('joi');

function productValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const statusCode = error.details[0].type === 'any.required' ? 400 : 422;
    res.status(statusCode).json({ message: error.details[0].message });
  }

  next();
}

module.exports = productValidation;
