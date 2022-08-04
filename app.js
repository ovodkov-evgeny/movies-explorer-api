require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const celebrate = require('celebrate');

const { errorLogger, expressLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');
const { mongodbServer, port, corsSettings } = require('./utils/config');

const { PORT = port, MONGOD_SERVER = mongodbServer } = process.env;

const app = express();

mongoose.connect(MONGOD_SERVER);
app.listen(PORT);

app.use(expressLogger);
app.use(limiter);

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('*', cors(corsSettings));

app.use(routes);

app.use(errorLogger);
app.use(celebrate.errors());
app.use(errorsHandler);
