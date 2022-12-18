const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((total, current) => total + current.likes, 0);

const favoriteBlog = (blogs) => {
  const highestLikes = Math.max(...blogs.map((b) => b.likes));
  return blogs.find((blog) => blog.likes === highestLikes) ?? null;
};

const authorCustomObject = (blogs, customPropertyKey, customPropertyValue) => {
  const blogsGroupedByAuthor = _.groupBy(blogs, 'author');

  return (
    _.maxBy(
      _.map(blogsGroupedByAuthor, (authorBlogs, author) => ({
        author,
        [customPropertyKey]: customPropertyValue(authorBlogs),
      })),
      customPropertyKey,
    ) ?? null
  );
};

const mostBlogs = (blogs) => authorCustomObject(blogs, 'blogs', (authorBlogs) => authorBlogs.length);

const mostLikes = (blogs) => authorCustomObject(blogs, 'likes', (authorBlogs) => _.reduce(
  authorBlogs,
  (likes, blog, key) => (likes += blog.likes),
  0,
));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
