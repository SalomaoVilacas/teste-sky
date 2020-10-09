const constant = {
  BACKEND: {
    PORT: process.env.BACKEND_PORT || '3000',
    SECRET: 'essadeveserumastringsecretaqueserautilizadaparagerartokens'
  },
  DATABASE: {
    IP: process.env.DATABASE_IP || 'localhost',
    PORT: process.env.DATABASE_PORT || '3306',
    NAME: process.env.DATABASE_NAME || 'teste-sky',
    USER_NAME: process.env.DATABASE_USER_NAME || 'dbuser',
    USER_PASSWORD: process.env.DATABASE_USER_PASSWORD || 'dbuser'
  },
  LOGGER: {
    DIRECTORY: 'log',
    FILENAME_ERROR: '/error.log',
    FILENAME_WARN: '/warn.log',
    FILENAME_INFO: '/info.log',
    FILENAME_DEBUG: '/debug.log',
    TIMESTAMP: true,
    MAX_LOG_FILE_SIZE: 10000
  }
};

module.exports = constant;
