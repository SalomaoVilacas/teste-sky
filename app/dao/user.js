const mongoose = require('mongoose');
const model = mongoose.model('user');

const userDAO = {};

userDAO.create = user => model.create(user);
userDAO.readByEmail = email => model.findOne({ email }).lean();
userDAO.readById = id => model.findOne({ id }).lean();
userDAO.updateByEmail = (email, user) => model.findOneAndUpdate({ email }, user, { new: true, useFindAndModify: false });

module.exports = userDAO;
