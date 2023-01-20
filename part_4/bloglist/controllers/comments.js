const commentRouter = require('express').Router({ mergeParams: true });
const Comment = require('../models/comment');
const Blog = require('../models/blog');

commentRouter.get('/', async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments);
});

commentRouter.post('/', async (request, response) => {
  const { body } = request.body;
  const blogId = request.params.id;
  const comment = new Comment({ body, blogId });
  const savedComment = await comment.save();

  const blogToComment = await Blog.findById(blogId);
  blogToComment.comments = [...blogToComment.comments, savedComment._id];
  await blogToComment.save();

  response.status(201).json(savedComment);
});

module.exports = commentRouter;
