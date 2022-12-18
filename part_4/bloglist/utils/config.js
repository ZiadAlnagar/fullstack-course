require('dotenv').config();

const { PORT } = process.env;
const { HTTPS_PORT } = process.env;
const { MONGODB_URI } = process.env;

module.exports = {
  PORT,
  HTTPS_PORT,
  MONGODB_URI,
};
