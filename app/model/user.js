const mongoose = require('mongoose');

const telefone = mongoose.Schema({
  numero: {
    type: String,
    required: true
  },
  ddd: {
    type: String,
    required: true
  }
}, { versionKey: false, _id: false });

const user = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  data_criacao: {
    type: Date,
    required: true
  },
  data_atualizacao: {
    type: Date,
    required: true
  },
  ultimo_login: {
    type: Date,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  telefones: [telefone]
}, { versionKey: false, strict: true });

mongoose.model('user', user, 'user');
