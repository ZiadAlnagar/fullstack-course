const blogsRouter = require('express').Router();
const { authenticator } = require('../utils/middleware');
const Blog = require('../models/blog');

const isNotAuthorized = (blog, user, res) => (blog.user._id.toString() !== user.id
  ? res.status(403).send({
    error: 'only the the blog post creator can perform this action.',
  })
  : null);

const requestValidationError = (requestBody, response) => {
  const fields = ['title', 'url'];
  const errors = fields.filter((field) => !requestBody[field]);

  if (errors.length !== 0) {
    return response.status(400).json({
      error: errors.map((field) => `${field} is required`).join(', '),
    });
  } return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments');
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const requestedBlog = await Blog.findById(request.params.id).populate(
    'user',
    { username: 1, name: 1 },
  ).populate('comments');
  if (!requestedBlog) return response.status(404).end();

  response.json(requestedBlog);
});

blogsRouter.post('/', ...authenticator, async (request, response) => {
  const { body, user } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();

  const savedBlogPopulated = await savedBlog.populate('user', {
    username: 1,
    name: 1,
  });

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlogPopulated);
});

blogsRouter.put('/:id', ...authenticator, async (request, response) => {
  const { body } = request;
  const { user } = request;

  if (requestValidationError(request.body, response)) return;
  const blog = await Blog.findById(request.params.id);
  if (!blog) return response.status(404).end();

  if (isNotAuthorized(blog, user, response)) return;

  const editedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: blog.user,
  };

  await blog.replaceOne(editedBlog);
  const updatedBlog = await Blog.findById(blog.id).populate('user', {
    username: 1,
    name: 1,
  });

  response.status(200).json(updatedBlog);
});

blogsRouter.delete('/:id', ...authenticator, async (request, response) => {
  const { user } = request;

  const blog = await Blog.findById(request.params.id);
  if (!blog) return response.status(204).end();

  if (isNotAuthorized(blog, user, response)) return;

  await blog.remove();
  response.status(204).end();
});

module.exports = blogsRouter;
