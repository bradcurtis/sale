const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const sales = require('./api/sales');
const login = require('./api/login');

require('dotenv').config();
// const middlewares = require('./middlewares');

// console.log(process.env.DATABASE_URL);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());

const port = process.env.PORT || 1337;

app.get('/', (req, rest) => {
  rest.json({
    message: 'Hello World',
  });
});

app.use('/api/sales', sales);

app.use('/api/login', login);

app.use((req, rest, next) => {
  const error = new Error(`Not Found  --> ${req.originalUrl}`);
  rest.status(404);
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 't' : error.stack,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('listening on 1337');
});
