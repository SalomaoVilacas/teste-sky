const { v4: uuid } = require('uuid');

const userVAO = require('../validation/user');
const userDAO = require('../dao/user');
const jwt = require('../../utility/jwt');
const logger = require('../../utility/logger');

class UserController {

  static getRoutes() {
    let routes = {
      SIGNUP: '/signup',
      SIGNIN: '/signin',
      SEARCH: '/search/:id'
    };

    return routes;
  }

  signup(request, response) {
    let user = request.body;
    let validationErrors = userVAO.signup(user);

    if (validationErrors) {
      return response.status(400).json({
        mensagem: 'Ocorreu um erro ao validar dados',
        dadosInvalidos: validationErrors
      });
    }

    userDAO.readByEmail(user.email)
      .then(result => {
        if (result) return response.status(400).json({ mensagem: 'Email já existente' });

        user.id = uuid();
        user.data_criacao = new Date();
        user.data_atualizacao = user.data_criacao;
        user.ultimo_login = user.data_criacao;
        user.token = jwt.encode({
          id: user.id,
          nome: user.nome,
          email: user.email
        });

        return userDAO.create(user);
      })
      .then(result => {
        result = JSON.parse(JSON.stringify(result));
        delete result._id;

        return response.status(201).json(result);
      })
      .catch(error => {
        logger.error(error);

        return response.status(500).json({
          mensagem: 'Ocorreu um erro interno'
        });
      });
  }

  signin(request, response) {
    let email = request.body.email;
    let senha = request.body.senha;

    let validationErrors = userVAO.signin({ email, senha });

    if (validationErrors) {
      return response.status(400).json({
        mensagem: 'Ocorreu um erro ao validar dados',
        dadosInvalidos: validationErrors
      });
    }

    userDAO.readByEmail(email)
      .then(result => {
        if (!result) return response.status(404).json({ mensagem: 'Usuário e/ou senha inválidos' });
        else if (senha !== result.senha) return response.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });

        result.data_atualizacao = new Date();
        result.ultimo_login = result.data_atualizacao;
        result.token = jwt.encode({
          id: result.id,
          nome: result.nome,
          email: result.email
        });

        return userDAO.updateByEmail(email, result);
      })
      .then(result => {
        result = JSON.parse(JSON.stringify(result));
        delete result._id;

        return response.status(200).json(result);
      })
      .catch(error => {
        logger.error(error);

        return response.status(500).json({
          mensagem: 'Ocorreu um erro interno'
        });
      });
  }

  search(request, response) {
    let token = request.headers.authorization;
    let id = request.params.id;

    if (!token) return response.status(401).json({ mensagem: 'Não autorizado' });

    token = token.slice(7);

    userDAO.readById(id)
      .then(result => {
        if (token !== result.token) return response.status(403).json({ mensagem: 'Não autorizado' });

        let now = new Date().getTime();

        if ((now - result.ultimo_login.getTime()) > 1800000) return response.status(401).json({ mensagem: 'Sessão inválida' });

        delete result._id;

        return response.status(200).json(result);
      })
      .catch(error => {
        logger.error(error);

        return response.status(500).json({
          mensagem: 'Ocorreu um erro interno'
        });
      });
  }
}

module.exports = UserController;
