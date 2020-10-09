const UserController = require('../controller/user');
const userController = new UserController();

function userRoutes(app) {
  const {
    SIGNUP,
    SIGNIN,
    SEARCH
  } = UserController.getRoutes();

  app.post(SIGNUP, userController.signup);
  app.post(SIGNIN, userController.signin);
  app.get(SEARCH, userController.search);
}

module.exports = userRoutes;
