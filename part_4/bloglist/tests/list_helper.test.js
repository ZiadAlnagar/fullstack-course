const listHelper = require('../utils/list_helper');
const { initialBlogs } = require('./test_helper');

const emptyBloglist = [];
const listWithOneBlog = initialBlogs.slice(1, 2);

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBloglist);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(initialBlogs);
    expect(result).toBe(36);
  });
});

describe('top favorite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog(emptyBloglist);
    expect(result).toBeNull();
  });

  test('when list has only one blog, equals the blog of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test('of a bigger list, equals the blog with most likes', () => {
    const result = listHelper.favoriteBlog(initialBlogs);
    expect(result).toEqual(initialBlogs[2]);
  });
});

describe('blogger with most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs(emptyBloglist);
    expect(result).toBeNull();
  });

  test('when list has only one blog, equals the author of that with blogs count of 1', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const expected = { author: 'Edsger W. Dijkstra', blogs: 1 };
    expect(result).toEqual(expected);
  });

  test('of a bigger list, equals the author with most blogs with right blogs count', () => {
    const result = listHelper.mostBlogs(initialBlogs);
    const expected = { author: 'Robert C. Martin', blogs: 3 };
    expect(result).toEqual(expected);
  });
});

describe('blogger with most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes(emptyBloglist);
    expect(result).toBeNull();
  });

  test('when list has only one blog, equals the author of that with blog count of 1', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const expected = { author: 'Edsger W. Dijkstra', likes: 5 };
    expect(result).toEqual(expected);
  });

  test('of a bigger list, equals the author with most blogs with right likes count', () => {
    const result = listHelper.mostLikes(initialBlogs);
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 };
    expect(result).toEqual(expected);
  });
});
