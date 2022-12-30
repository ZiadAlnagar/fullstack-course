require('dotenv').config();

const { PORT } = process.env;
const { HTTPS_PORT } = process.env;
const { HTTPS } = process.env;
const { MONGODB_URI } = process.env;

module.exports = {
  PORT,
  HTTPS_PORT,
  HTTPS,
  MONGODB_URI,
};
