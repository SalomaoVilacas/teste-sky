const jwt = require('jsonwebtoken');

const { BACKEND: { SECRET } } = require('./constant');

module.exports = {
  encode: data => jwt.sign(data, SECRET),
  decode: token => jwt.verify(token, SECRET)
};
