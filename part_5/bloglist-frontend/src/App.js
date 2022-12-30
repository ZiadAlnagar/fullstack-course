import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Header from './components/Header';
import Login from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import User from './components/User';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  const sortBlogs = (unsortedBlogs) => unsortedBlogs
    .slice()
    // eslint-disable-next-line no-nested-ternary
    .sort((a, b) => (a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0));

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.index();
      setBlogs(sortBlogs(fetchedBlogs));
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const notify = (content, type) => {
    setMessage({ content, type });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const login = async (authObj) => {
    try {
      const authUser = await loginService.login(authObj);
      setUser(authUser);
      blogService.setToken(authUser.token);
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(authUser),
      );
      notify(`Hello, ${authUser.name}`, 'success');
    } catch (ex) {
      notify(ex?.response?.data?.error ?? 'wrong credentials', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.removeToken();
    window.localStorage.removeItem('loggedBlogAppUser');
    notify('You have logged out successfully', 'success');
  };

  const createBlog = async (blogObj) => {
    try {
      const savedBlog = await blogService.create(blogObj);
      setBlogs(blogs.concat(savedBlog));
      blogFormRef.current.toggleVisibility();
      notify(
        `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
        'success',
      );
    } catch (ex) {
      notify(ex?.response?.data?.error ?? 'blog creation faild', 'error');
    }
  };

  const updateBlog = async (blog) => {
    try {
      const { id } = blog;
      const blogObj = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user.id,
      };
      const updatedBlog = await blogService.update(id, blogObj);
      const sortedUpdatedBlogs = sortBlogs(
        blogs.map((b) => (b.id !== id ? b : updatedBlog)),
      );
      setBlogs(sortedUpdatedBlogs);
    } catch (ex) {
      notify(
        ex?.response?.data?.error ?? "couldn't perform this acction",
        'error',
      );
    }
  };

  const deleteBlog = async ({ id, title, author }) => {
    try {
      if (window.confirm(`Remove blog ${title} by ${author}`)) {
        await blogService.destroy(id);
        const sortedUpdatedBlogs = sortBlogs(blogs.filter((b) => b.id !== id));
        setBlogs(sortedUpdatedBlogs);
      }
    } catch (ex) {
      notify(
        ex?.response?.data?.error ?? "couldn't perform this acction",
        'error',
      );
    }
  };

  return (
    <div>
      <Notification message={message} />
      {!user ? (
        <div>
          <Header h={1} text='log in to application' />
          <Togglable btnLabel='log in' visible>
            <Login login={login} />
          </Togglable>
        </div>
      ) : (
        <div>
          <Header h={1} text='blogs' />
          <User user={user} onSubmit={handleLogout} />
          <Togglable btnLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.map((b) => (
            <Blog
              key={b.id}
              blog={b}
              like={updateBlog}
              destroy={deleteBlog}
              canDelete={b.user.username === user.username}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
