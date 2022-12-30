const fs = require('fs');
const http = require('http');
const https = require('https');

const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

const httpsOn = config.HTTPS;

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

if (httpsOn) {
  const options = {
    key: fs.readFileSync('cert.key'),
    cert: fs.readFileSync('cert.crt'),
    requestCert: false,
    rejectUnauthorized: false,
  };

  const httpsServer = https.createServer(options, app);

  httpsServer.listen(config.HTTPS_PORT, () => {
    logger.info(`HTTPS server running on port ${config.HTTPS_PORT}`);
  });
}
