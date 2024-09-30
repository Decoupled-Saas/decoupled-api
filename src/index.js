const { bgRed } = require('chalk');
const stoppable = require('stoppable');
const { env } = require('./utils/envConfig');
const { app, logger } = require('./server');
const { gracefulShutdown } = require('./utils/graceful-shutdown');

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

app.on('error', (appErr, appCtx) => {
  logger.error(`App Error: '${appErr.stack}' on url: '${appCtx.req.url}' with headers: '${appCtx.req.headers}'`);
});

process.on('unhandledRejection', async (err) => {
  logger.error(bgRed('UNHANDLED REJECTION! 💥 Shutting down...'));
  logger.error(err.name, err.stack);

  await gracefulShutdown(stoppable(server));
});

// Handle uncaught exceptions
process.on('uncaughtException', async (uncaughtExc) => {
  // Won't execute
  logger.error(bgRed('UNCAUGHT EXCEPTION! 💥 Shutting down...'));
  logger.error(`UncaughtException Error: ${uncaughtExc}`);
  logger.error(`UncaughtException Stack: ${JSON.stringify(uncaughtExc.stack)}`);

  await gracefulShutdown(stoppable(server));
});

// Graceful shutdown on SIGINT and SIGTERM signals
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, async () => {
    logger.warn(`Received ${signal} signal. Shutting down...`);
    await gracefulShutdown(server);
  });
});
