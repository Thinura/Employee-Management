const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

const { sequelize } = require('./models');
const employeeRouter = require('./controllers/employee');
const LOG = require('./logger');
const apiErrorHandler = require('./errors/apiErrorHandler');
const { HTTP_NOT_FOUND_CODE, HTTP_UNAUTHORIZED_CODE, HTTP_INTERNAL_SERVER_ERROR_CODE } = require('./constants/httpStatusCodes');

const port = process.env.PORT || 3000;
const path = require('path');

// Initializing swagger configuration
const swaggerPath = path.resolve('swagger.yml');
const swaggerDocument = YAML.load(swaggerPath);

const app = express();

// Adding middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(morgan('combined'));

// Adding routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/employee', employeeRouter);
app.use(apiErrorHandler);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = HTTP_NOT_FOUND_CODE;
  next(error);
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(HTTP_UNAUTHORIZED_CODE).json({ error: `${err.name}: ${err.message}` });
  }
  next(err);
});

app.use((error, req, res) => {
  LOG.error(error);
  const status = error.status || HTTP_INTERNAL_SERVER_ERROR_CODE;
  const message = error.message || 'Internal Server Error';
  res.status(status).json({ error: message });
});

// app.listen(port, async () => {
//   LOG.info(`Server listening on port ${port}`);
//   // await sequelize.sync({ force: true });
//   await sequelize.sync();
//   await sequelize.authenticate();
//   LOG.info('Database Connected successfully!');
// });

module.exports = app;
