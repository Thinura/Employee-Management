/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const pg = require('pg');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let dialectOptions = {}

if(process.env.NODE_ENV === 'production') {
  dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    dialectModule: pg,
    pool: {
      maxConnections: 1,
      maxIdleTime: 1000,
    },
    retry: {
      match: [
        /ConnectionError/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
        /SequelizeConnectionAcquireTimeoutError/,
        /Connection terminated unexpectedly/,
      ],
      max: Infinity,
    },
    synchronize: false,
    migrationsRun: true,
    migrations: ['./migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: './migrations',
    },
  };
}

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT,
    dialectOptions: dialectOptions
  });
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line global-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
