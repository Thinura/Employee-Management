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

const port = process.env.HTTP_PORT || 3000;

// Initializing swagger configuration
const swaggerDocument = YAML.load('./swagger.yml');

const app = express();

// Adding middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Adding routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/employee', employeeRouter);
app.use(apiErrorHandler);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: `${err.name}: ${err.message}` });
  }
  next(err);
});

app.use((error, req, res) => {
  LOG.error(error);
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  res.status(status).json({ error: message });
});

app.listen(port, async () => {
  LOG.info(`Server listening on port ${port}`);
  // await sequelize.sync({ force: true });
  await sequelize.sync();
  await sequelize.authenticate();
  LOG.info('Database Connected successfully!');
});
