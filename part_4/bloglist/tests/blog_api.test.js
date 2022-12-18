const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const { connectDB, dropCollections, dropDB } = require('./testdb_helper');
const helper = require('./test_helper');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

describe('when there is initially some blogs saved', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  beforeEach(async () => {
    await Blog.insertMany(helper.initialBlogs);
  });

  afterEach(async () => {
    await dropCollections();
  });

  describe('when two users are added and one blog saved with one of them', () => {
    function Login(username, password) {
      this.username = username;
      this.password = password;
    }

    const auth = async (username, password) => {
      const authUser = await api
        .post('/api/login')
        .send(new Login(username, password));
      return authUser.body;
    };

    let blogSavedWithUser;

    const initialBlogsLength = helper.initialBlogs.length + 1;

    beforeEach(async () => {
      const initUsers = [
        new User({
          username: 'root',
          name: 'Super User',
          passwordHash: await bcrypt.hash('123456', 10),
        }),
        new User({
          username: 'johndoe',
          name: 'John Doe',
          passwordHash: await bcrypt.hash('password', 10),
        }),
      ];
      const savedUsers = await User.insertMany(initUsers);

      const initBlog = new Blog({
        title: 'title of the post',
        author: 'author of the post',
        url: 'http/url/to/post.extension',
        likes: 0,
        user: savedUsers[0]._id,
      });
      blogSavedWithUser = await initBlog.save();
    });

    test('blogs are all returned in json format', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveLength(initialBlogsLength);
      expect(response.body[initialBlogsLength - 1].user.username).toBe('root');
    });

    test("all blogs' unique identifiers are named 'id'", async () => {
      const response = await api.get('/api/blogs');
      response.body.forEach((blog) => {
        expect(blog.id).toBeDefined();
        expect(blog._id).toBeUndefined();
      });
    });

    describe('viewing a specific blog with its user', () => {
      test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb();

        const blogToView = blogsAtStart[initialBlogsLength - 1];

        const response = await api
          .get(`/api/blogs/${blogToView.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/);

        expect(response.body).toEqual(blogToView);

        expect(response.body.user.username).toEqual(expect.any(String));
        expect(response.body.user.username).toBe(blogToView.user.username);
      });

      test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId();

        await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
      });

      test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '999999999';

        await api.get(`/api/blogs/${invalidId}`).expect(400);
      });
    });

    describe('addition of a new blog', () => {
      test('succeeds with valid data and authorized user', async () => {
        const user = await auth('root', '123456');

        const newBlog = {
          title: 'title',
          author: 'author',
          url: 'http/url/to/another-post.extension',
          likes: 15,
        };

        const response = await api
          .post('/api/blogs')
          .set({ Authorization: `bearer ${user.token}` })
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(initialBlogsLength + 1);
        expect(blogsAtEnd).toContainEqual({
          ...response.body,
          user: expect.any(Object),
        });
      });

      test("succeeds if authorized and if blog's 'likes' property is missing, it defaults to zero", async () => {
        const user = await auth('root', '123456');

        const newBlog = {
          title: 'title of the post',
          author: 'author of the post',
          url: 'http/url/to/post.extension',
        };

        const response = await api
          .post('/api/blogs')
          .set({ Authorization: `bearer ${user.token}` })
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();

        expect(response.body).toMatchObject({ likes: 0 });

        expect(blogsAtEnd).toHaveLength(initialBlogsLength + 1);
        expect(blogsAtEnd).toContainEqual({
          ...response.body,
          user: expect.any(Object),
        });
      });

      test('fails with statuscode 400 and error message if title and/or url missing', async () => {
        const user = await auth('root', '123456');

        const newBlog = {
          author: 'author of the post',
        };

        const response = await api
          .post('/api/blogs')
          .set({ Authorization: `bearer ${user.token}` })
          .send(newBlog)
          .expect(400)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();

        expect(response.body).toMatchObject({
          error: expect.stringContaining('validation failed'),
        });

        expect(blogsAtEnd).toHaveLength(initialBlogsLength);
      });

      test('fails with statuscode 401 if no token', async () => {
        const newBlog = {
          title: 'new title',
          author: 'new author',
          url: 'new url',
          likes: 25,
        };

        const response = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();

        expect(response.body).toMatchObject({
          error: expect.stringContaining('token missing or invalid'),
        });

        expect(blogsAtEnd).toHaveLength(initialBlogsLength);
      });
    });

    describe('updating of a blog post', () => {
      test('succeeds with valid data and authorized user', async () => {
        const user = await auth('root', '123456');

        const newBlog = {
          title: 'new title',
          author: 'new author',
          url: 'new url',
          likes: 25,
        };

        const response = await api
          .put(`/api/blogs/${blogSavedWithUser.id}`)
          .set({ Authorization: `bearer ${user.token}` })
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(initialBlogsLength);

        expect(blogsAtEnd).not.toContainEqual(blogSavedWithUser);
        expect(blogsAtEnd).toContainEqual(expect.objectContaining(newBlog));
      });

      test('fails with statuscode 400 and error message if title and/or url missing', async () => {
        const user = await auth('root', '123456');

        const newBlog = {
          title: 'new title',
          author: 'new author',
          likes: 25,
        };

        const response = await api
          .put(`/api/blogs/${blogSavedWithUser.id}`)
          .set({ Authorization: `bearer ${user.token}` })
          .send(newBlog)
          .expect(400)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();

        expect(response.body).toMatchObject({
          error: expect.stringContaining('required'),
        });

        expect(blogsAtEnd).toHaveLength(initialBlogsLength);
      });

      test('fails with statuscode 404 if blog does not exist', async () => {
        const user = await auth('root', '123456');

        const newBlog = {
          title: 'new title',
          author: 'new author',
          url: 'new url',
          likes: 25,
        };

        const nonExistentBlog = new Blog({
          title: 'new title',
          author: 'new author',
          url: 'new url',
          likes: 25,
        });

        const response = await api
          .put(`/api/blogs/${nonExistentBlog.id}`)
          .set({ Authorization: `bearer ${user.token}` })
          .send(newBlog)
          .expect(404);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(initialBlogsLength);
      });

      test('fails with statuscode 401 if no token', async () => {
        const newBlog = {
          title: 'new title',
          author: 'new author',
          url: 'new url',
          likes: 25,
        };

        const response = await api
          .put(`/api/blogs/${blogSavedWithUser.id}`)
          .send(newBlog)
          .expect(401)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();

        expect(response.body).toMatchObject({
          error: expect.stringContaining('token missing or invalid'),
        });

        expect(blogsAtEnd).toHaveLength(initialBlogsLength);
      });

      test('fails with statuscode 403 and error message if not authorized', async () => {
        const user = await auth('johndoe', 'password');

        const newBlog = {
          title: 'new title',
          author: 'new author',
          url: 'new url',
          likes: 25,
        };

        const response = await api
          .put(`/api/blogs/${blogSavedWithUser.id}`)
          .set({ Authorization: `bearer ${user.token}` })
          .send(newBlog)
          .expect(403)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();

        expect(response.body).toMatchObject({
          error: expect.stringContaining(
            'only the the blog post creator can perform this action',
          ),
        });

        expect(blogsAtEnd).toHaveLength(initialBlogsLength);
      });
    });

    describe('deletion of a blog post', () => {
      test('succeeds if authorized', async () => {
        const user = await auth('root', '123456');

        const response = await api
          .delete(`/api/blogs/${blogSavedWithUser.id}`)
          .set({ Authorization: `bearer ${user.token}` })
          .expect(204);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(initialBlogsLength - 1);
        expect(blogsAtEnd).not.toContainEqual(blogSavedWithUser);
      });

      test('succeeds if blog does not exist', async () => {
        const user = await auth('root', '123456');

        const newBlog = new Blog({
          title: 'title',
          author: 'author',
          url: 'url',
        });

        const response = await api
          .delete(`/api/blogs/${newBlog.id}`)
          .set({ Authorization: `bearer ${user.token}` })
          .expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(initialBlogsLength);
      });

      test('fails with statuscode 401 if no token', async () => {
        const response = await api
          .delete(`/api/blogs/${blogSavedWithUser.id}`)
          .expect(401)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();

        expect(response.body).toMatchObject({
          error: expect.stringContaining('token missing or invalid'),
        });

        expect(blogsAtEnd).toHaveLength(initialBlogsLength);
      });

      test('fails with statuscode 403 if not authorized', async () => {
        const user = await auth('johndoe', 'password');

        const response = await api
          .delete(`/api/blogs/${blogSavedWithUser.id}`)
          .set({ Authorization: `bearer ${user.token}` })
          .expect(403)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();

        expect(response.body).toMatchObject({
          error: expect.stringContaining(
            'only the the blog post creator can perform this action',
          ),
        });

        expect(blogsAtEnd).toHaveLength(initialBlogsLength);
      });
    });
  });
});
