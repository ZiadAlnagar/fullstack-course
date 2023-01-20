const mongoose = require('mongoose');
const { toClient } = require('../utils/helpers');

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
});

toClient(commentSchema);

module.exports = mongoose.model('Comment', commentSchema);
