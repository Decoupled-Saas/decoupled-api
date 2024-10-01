import winston from 'winston';
import appRoot from 'app-root-path';

const { combine, timestamp, json, colorize, simple } = winston.format;


const options = {
  level: 'debug',
  format: combine(timestamp(), json()),
  file: {
    level: 'info',
    filename: `${appRoot}/logs/decoupled.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    format: combine(colorize({ all: true }), simple()),
    handleExceptions: true,
    json: true,
    colorize: true
  }
};

// eslint-disable-next-line new-cap
// @ts-ignore
const logger = new winston.createLogger({
  transports: [
    process.env.NODE_ENV === 'production'
      ? new winston.transports.File(options.file)
      : new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

logger.stream = {
  // @ts-ignore
  write: (message, encoding) => {
    logger.info(message.toString(encoding));
  }
};


export { logger };
