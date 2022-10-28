const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, label, printf,
} = format;
const myFormat = printf(({ level, message, timestamp: time }) => `${time} ${level}: ${message}`);

const developmentLogger = createLogger({
  level: 'debug',
  // format: winston.format.simple(),
  format: combine(
    format.colorize(),
    label({ label: 'right meow!' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat,
  ),

  // defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'errors.log',

    }),
  ],
});

module.exports = developmentLogger;
