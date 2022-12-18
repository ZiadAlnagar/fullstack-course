const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const requestValidationError = (requestBody, response) => {
  const fields = ['username', 'password'];
  const errors = fields.filter(
    (field) => !requestBody[field] || requestBody[field].length < 3,
  );

  if (errors.length !== 0) {
    return response.status(400).json({
      error: errors
        .map((field) => {
          if (!requestBody[field]) return `${field} is required`;
          return `${field} must have at least 3 characters`;
        })
        .join(', '),
    });
  }
  return null;
};

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (requestValidationError(request.body, response)) return;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
