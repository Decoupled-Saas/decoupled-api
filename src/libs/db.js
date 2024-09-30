require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_CLIENT,
    useUTC: true,
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      keepAlive: true
      // useUTC: true
    },
    // logQueryParameters: console.log,
    // logging: console.log
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_CLIENT,
    useUTC: true,
    ssl: {
      ca: '../../ca-certificate.crt',
      require: true,
      rejectUnauthorized: false
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      keepAlive: true
    },
    logQueryParameters: false,
    // eslint-disable-next-line no-console
    logging: console.log
  }
};
