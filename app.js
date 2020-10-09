require('dotenv').config();

const http = require('http');

const databaseConnect = require('./configuration/database');
const express = require('./configuration/express');
const logger = require('./utility/logger');
const { BACKEND: { PORT } } = require('./utility/constant');

databaseConnect()
  .then(function () {
    let app = express();
    let server = http.Server(app);

    server.listen(PORT, () => logger.info('Backend started successfully'));
  })
  .catch(error => logger.error(error));
