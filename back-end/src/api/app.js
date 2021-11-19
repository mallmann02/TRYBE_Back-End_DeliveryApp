const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRouter = require('../routers/loginRouter');
const registerRouter = require('../routers/registerRouter');
const productRouter = require('../routers/productRouter');
const salesRouter = require('../routers/salesRouter');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));
app.use(bodyParser.json());

const apiRoutes = express.Router();
app.use(express.static('public'));

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/products', productRouter);

app.use('/sales', salesRouter);

app.use(apiRoutes);

module.exports = app;
