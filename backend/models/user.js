const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { linkRegExPattern } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [
        2,
        'Имя должно быть длиннее 2-х символов, сейчас его длина {VALUE} символ(ов)',
      ],
      maxlength: [
        30,
        'Имя должно быть короче 30 символов, сейчас его длина {VALUE} символ(ов)',
      ],
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: [
        2,
        'Описание должно быть длиннее 2-х символов, сейчас его длина {VALUE} символ(ов)',
      ],
      maxlength: [
        30,
        'Описание должно быть короче 30 символов, сейчас его длина {VALUE} символ(ов)',
      ],
    },
    avatar: {
      type: String,
      validate: linkRegExPattern,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validation: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function userValidation(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
