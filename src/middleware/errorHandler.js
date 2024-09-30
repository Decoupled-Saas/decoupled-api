const { StatusCodes } = require('http-status-codes');

const unexpectedRequest = (req, res) => {
  res.sendStatus(StatusCodes.NOT_FOUND);
};

const addErrorToRequestLog = (err, req, res, next) => {
  res.locals.err = err;
  next(err);
};

module.exports = () => [unexpectedRequest, addErrorToRequestLog];
