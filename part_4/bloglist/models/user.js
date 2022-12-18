const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { toClient } = require('../utils/helpers');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  }],
});

userSchema.plugin(uniqueValidator);

toClient(userSchema, (returnedObject) => {
  delete returnedObject.passwordHash;
});

module.exports = mongoose.model('User', userSchema);
