const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const tokenExtractor = async (request, response, next) => {
  const authHeader = request.get('authorization');

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return response.status(401).send({ error: 'token missing or invalid' });

  request.token = token;
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.TOKEN_SECRET);
  if (!decodedToken) return response.status(401).send({ error: 'token missing or invalid' });

  const user = await User.findById(decodedToken.id);
  if (!user) return response.status(401).end();

  request.user = user;
  next();
};

const authenticator = [tokenExtractor, userExtractor];

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } if (error.name === 'TokenExpiredError') {
    return response.status(401).send({
      error: 'token expired',
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  authenticator,
};
