const Viladator = require('viladator');

function signup(data) {
  let viladator = new Viladator();

  viladator.setObject(data);

  viladator.check('nome').isString().isLength({ min: 1 });
  viladator.check('email').isEmail();
  viladator.check('senha').isString().isLength({ min: 8, max: 32 });
  viladator.check('telefones').isArray();
  viladator.check('telefones.*.numero').isString().isLength({ min: 9, max: 9 });
  viladator.check('telefones.*.ddd').isString().isLength({ min: 3, max: 3 });
  viladator.check('#').isIn(['nome', 'email', 'senha', 'telefones']);
  viladator.check('telefones.*.#').isIn(['numero', 'ddd']);

  return viladator.validationErrors();
}

function signin(data) {
  let viladator = new Viladator();

  viladator.setObject(data);

  viladator.check('email').isEmail();
  viladator.check('senha').isString().isLength({ min: 8, max: 32 });
  viladator.check('#').isIn(['email', 'senha']);

  return viladator.validationErrors();
}

function search(data) {
  let model = [
    { name: 'id', type: 'string', min: 1, max: 32, required: false },
  ];

  let errors = requestValidation.validate(data, model);

  return errors.length > 0 ? errors : false;
}

module.exports = {
  signup,
  signin,
  search
};
