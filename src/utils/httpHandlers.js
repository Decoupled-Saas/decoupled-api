const { StatusCodes } = require('http-status-codes');
const { ServiceResponse } = require('./serviceResponse');

const handleServiceResponse = (serviceResponse, response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    return next();
  } catch (err) {
    const errorMessage = `Invalid input: ${err.errors.map((e) => e.message).join(', ')}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode);
    return handleServiceResponse(serviceResponse, res);
  }
};

module.exports = { handleServiceResponse, validateRequest };
