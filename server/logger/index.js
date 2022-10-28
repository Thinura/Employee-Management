const developmentLogger = require('./developmentLogger');
const productionLogger = require('./productionLogger');

const logger = () => {
  if (process.env.NODE_ENV === 'production') { return productionLogger; }

  return developmentLogger;
};

module.exports = logger();
