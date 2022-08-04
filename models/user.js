const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { WRONG_DATA_MSG } = require('../utils/constants');

const user = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (v) => isEmail(v),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

}, { versionKey: false });

user.statics.findUserByCredentials = function findUserByCredentials({ email, password }) {
  return this.findOne({ email }).select('+password').then((data) => {
    if (!data) {
      return Promise.reject(new UnauthorizedError(WRONG_DATA_MSG));
    }

    return bcrypt.compare(password, data.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError(WRONG_DATA_MSG));
      }
      return data;
    });
  });
};

module.exports = model('user', user);
