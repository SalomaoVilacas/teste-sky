const consign = require('consign');
const cors = require('cors');
const express = require('express');

function expressConfig() {
  let app = express();

  app.use(express.json());
  app.use(cors());

  consign({
    cwd: 'app',
    verbose: true
  })
    .then('model')
    .then('route')
    .into(app);

  return app;
}

module.exports = expressConfig;
