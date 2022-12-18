const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const { connectDB, dropCollections, dropDB } = require('./testdb_helper');
const helper = require('./test_helper');

const api = supertest(app);

const User = require('../models/user');
const Blog = require('../models/blog');

describe('when there is initially one user with 2 blogs in db', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  beforeEach(async () => {
    await Blog.insertMany(helper.initialBlogs);
    const blogsInDb = await helper.blogsInDb();

    const userBlogsPromises = blogsInDb
      .slice(0, 2)
      .map((b) => Blog.findById(b.id));
    const userBlogs = await Promise.all(userBlogsPromises);

    const passwordHash = await bcrypt.hash('123456', 10);
    const user = new User({
      username: 'root',
      name: 'Super User',
      passwordHash,
      blogs: userBlogs,
    });

    await user.save();
  });

  afterEach(async () => {
    await dropCollections();
  });

  test('users are all returned in json format', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].blogs[0].title).toEqual(expect.any(String));
  });

  describe('creation of a new user', () => {
    test('succeeds with valid username and password', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'johndoe',
        name: 'John Doe',
        password: 'password',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test('fails with statuscode 400 and error message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'root',
        name: 'John Doe',
        password: 'password',
      };

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body.error).toContain('User validation failed');
      expect(response.body.error).toContain('unique');

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test('fails with statuscode 400 and error message if username and/or password missing', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        name: 'John Doe',
        password: 'password',
      };

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body.error).toContain('required');

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test('fails with statuscode 400 and error message if username and/or password less than 3 charcters long', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'jo',
        name: 'John Doe',
        password: 'pa',
      };

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body.error).toContain('at least 3 characters');

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });
  });
});
