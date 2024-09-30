const { z } = require('zod');
const { StatusCodes } = require('http-status-codes');

class ServiceResponse {
  responder(successful, message, responseObject, statusCode) {
    this.successful = successful;
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;

    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  success(message, responseObject, statusCode = StatusCodes.OK) {
    return this.responder(true, message, responseObject, statusCode);
  }

  // eslint-disable-next-line class-methods-use-this
  failure(message, responseObject, statusCode = StatusCodes.BAD_REQUEST) {
    return this.responder(false, message, responseObject, statusCode);
  }
}

exports.ServiceResponseSchema = (dataScheme) => {
  z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataScheme.optional(),
    statusCode: z.number()
  });
};

module.exports = new ServiceResponse();
