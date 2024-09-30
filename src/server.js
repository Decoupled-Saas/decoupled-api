const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const { StatusCodes } = require('http-status-codes');

const logger = require('./utils/logger');
const { env } = require('./utils/envConfig');
// const rateLimiter = require('./middleware/rateLimiter');
// const errorHandler = require('./middleware/errorHandler');
// const { handleServiceResponse } = require('./utils/httpHandlers');
// const ServiceResponse = require('./utils/serviceResponse');

const corsOptions = {
  origin: env.CORS_ORIGIN,
  credentials: true
};

const app = express();
const morganFormat = ':method :url :status :res[content-length] - :response-time ms'; // Customize format

app.use(morgan(morganFormat, { stream: logger.stream }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(compression());
app.use(cors(corsOptions));
app.use(helmet());

module.exports = {app, logger}
