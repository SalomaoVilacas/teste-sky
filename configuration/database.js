const mongoose = require('mongoose');

const { DATABASE: { IP, PORT, NAME } } = require('../utility/constant');
const logger = require('../utility/logger');

function databaseConfig() {
  return new Promise(function (resolve, reject) {

    mongoose.connect(`mongodb://${IP}:${PORT}/${NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
      logger.info('Connected to Mongo database');
      resolve();
    });

    mongoose.connection.on('error', reject);

    mongoose.connection.on('disconnected', () => logger.error('Disconnected to the Mongo database'));

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        logger.info('Process terminated, connection to the Mongo database closed');
        process.exit(0);
      });
    });
  });
}

module.exports = databaseConfig;
