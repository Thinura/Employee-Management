const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const app = require('./app');
const { sequelize } = require('./models');
const LOG = require('./logger');

const { PORT, NODE_ENV } = process.env;
let server;
if(NODE_ENV === 'production'){
    var key = fs.readFileSync(path.join(__dirname, 'certs', 'selfsigned.key'));
    var cert = fs.readFileSync(path.resolve(__dirname, 'certs', 'selfsigned.crt'));
    var options = {
        key: key,
        cert: cert
    };
    server = https.createServer(options, app);
} else if(NODE_ENV === 'development'){
    server = http.createServer(app);
}

server.listen(PORT, async () => {
    LOG.info(`Server listening on host port ${PORT}`);
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    await sequelize.authenticate();
    LOG.info('Database Connected successfully!');
  });