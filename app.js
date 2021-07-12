const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errorsHandler');
const limiter = require('./middlewares/rateLimiter');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

dotenv.config();
const {
  NODE_ENV,
  PORT = 3030,
  DB_URL,
} = process.env;

const app = express();
app.use(helmet());
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/school-site', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: NODE_ENV === 'production' ? 'https://school-390.kamenev.tech' : ['http://localhost:3000/', 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate

app.use(errorsHandler);

app.listen(PORT);
