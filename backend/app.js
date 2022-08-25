const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { celebrate, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const {
  loginUserValidator,
  createUserValidator,
} = require('./middlewares/dataValidation');
const NotFoundError = require('./errors/NotFoundError');
const { cors } = require('./middlewares/cors');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger); // логгер запросов
// app.use(cors);
app.get('/crash-test', cors, () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', cors, celebrate(loginUserValidator), login);
app.post('/signup', cors, celebrate(createUserValidator), createUser);

app.use('/users', cors, auth, userRouter);
app.use('/cards', cors, auth, cardRouter);
app.use('/*', cors, auth, (req, res, next) => {
  next(new NotFoundError('Упс! Такой страницы не существует'));
});
app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});
app.listen(PORT);
