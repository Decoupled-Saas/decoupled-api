import winston from 'winston';
import appRoot from 'app-root-path';

import KnexTransport from 'winston-knex';
import knexFile from '../../../knexfile';
import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
// @ts-ignore
const configOptions = knexFile[env];

const { combine, timestamp, printf, colorize, simple } = winston.format;
const formatMessage = (info: any) => `${info.level} ${info.message}`;
const formatError = (info: any) => `${info.level} ${info.message}\n\n${info.stack}\n`;
const fmt = (info: any) => (info instanceof Error ? formatError(info) : formatMessage(info));
const options = {
  level: 'debug',
  format: combine(timestamp(), printf(fmt)),
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
    json: false,
    colorize: true
  }
};

// eslint-disable-next-line new-cap
// @ts-ignore
const logger = new winston.createLogger({
  transports: [
    /*
    new KnexTransport({
      // @ts-ignore
      client: configOptions.client,
      connection: {
        // @ts-ignore
        database: configOptions.connection.database,
        // @ts-ignore
        user: configOptions.connection.user,
        // @ts-ignore
        password: configOptions.connection.password,
        // @ts-ignore
        host: configOptions.connection.host,
        // @ts-ignore
        port: configOptions.connection.port
      }
    }),
     */
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
