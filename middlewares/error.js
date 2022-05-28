function errorMiddleware(error, _req, res, _next) {
  const joiTypesStatusCodes = {
    'any.required': 400,
    'string.min': 422,
    'number.min': 422,
  };

  const { message } = error;
  const statusCode = error.statusCode || joiTypesStatusCodes[error.type];

  res.status(statusCode).json({ message });
}

module.exports = errorMiddleware;
