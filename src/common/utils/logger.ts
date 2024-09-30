import winston from 'winston';
import appRoot from 'app-root-path';
import { Sequelize } from 'sequelize';
// @ts-ignore
import WinstonTransportSequelize from 'winston-transport-sequelize';
// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-dynamic-require
const config = require('@/libs/db.js')[process.env.NODE_ENV || 'development'];

let sequelize;
if (config.use_env_variable) {
  // @ts-ignore
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const { combine, timestamp, json, colorize, simple } = winston.format;

const sequelizeOptions = {
  sequelize,
  tableName: 'WinstonLog',
  meta: { project: 'decoupled' },
  // @ts-ignore
  fields: { meta: Sequelize.JSONB },
  modelOptions: { timestamps: true }
};

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
    new WinstonTransportSequelize(sequelizeOptions),
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

sequelize.sync();

export { logger };
