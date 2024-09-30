const gracefulShutdown = async (server) => {
  try {
    console.info('Closed database connection');
    server.close();
    process.exit(0);
  } catch (err) {
    console.info(err);
    process.exit(1);
  }
};

module.exports = { gracefulShutdown };
