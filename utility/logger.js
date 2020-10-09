const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;
const { LOGGER } = require('./constant');

var logger;

if (!fs.existsSync(LOGGER.DIRECTORY)) fs.mkdirSync(LOGGER.DIRECTORY);

logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.File({
      level: 'error',
      timestamp: LOGGER.TIMESTAMP,
      filename: LOGGER.DIRECTORY + LOGGER.FILENAME_ERROR,
      maxsize: LOGGER.MAX_LOG_FILE_SIZE
    }),
    new transports.File({
      level: 'warn',
      filename: LOGGER.DIRECTORY + LOGGER.FILENAME_WARN,
      maxsize: LOGGER.MAX_LOG_FILE_SIZE
    }),
    new transports.File({
      level: 'info',
      filename: LOGGER.DIRECTORY + LOGGER.FILENAME_INFO,
      maxsize: LOGGER.MAX_LOG_FILE_SIZE
    }),
    new transports.File({
      level: 'debug',
      filename: LOGGER.DIRECTORY + LOGGER.FILENAME_DEBUG,
      maxsize: LOGGER.MAX_LOG_FILE_SIZE
    })
  ]
});

module.exports = {
  error: error => {
    console.error(error);
    logger.error(error);
  },
  warn: warn => {
    console.warn(warn);
    logger.warn(warn);
  },
  info: info => {
    console.info(info);
    logger.info(info);
  },
  debug: debug => {
    console.debug(debug);
    logger.debug(debug);
  }
};
