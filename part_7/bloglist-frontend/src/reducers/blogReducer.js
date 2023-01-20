import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import commentService from '../services/comments';
import { setNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    like(state, action) {
      const id = action.payload;
      const toBeLiked = state.find((blog) => blog.id === id);
      const { likes } = toBeLiked;
      const liked = { ...toBeLiked, likes: likes + 1 };
      return state.map((blog) => (blog.id !== id ? blog : liked));
    },
    comment(state, action) {
      const { id, comment } = action.payload;
      const toBeCommented = state.find((blog) => blog.id === id);
      const { comments } = toBeCommented;
      const commented = { ...toBeCommented, comments: [...comments, comment] };
      return state.map((blog) => (blog.id !== id ? blog : commented));
    },
    destroy(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { setBlogs, appendBlog, destroy, like, comment } = blogSlice.actions;
export default blogSlice.reducer;

export const initBlogs = () => async (dispatch) => {
  const blogs = await blogService.index();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blog, toggleVisibility) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success'));
    toggleVisibility();
  } catch (ex) {
    dispatch(setNotification(ex?.response?.data?.error ?? 'blog creation faild', 'error'));
  }
};

export const likeBlog = (blog, curLikes) => async (dispatch) => {
  try {
    const { id } = blog;
    const blogToLike = { ...blog, user: blog.user.id, likes: curLikes + 1 };
    const likedBlog = await blogService.update(id, blogToLike);
    dispatch(like(id));
    dispatch(setNotification(`liked ${likedBlog.title}`, 'success'));
  } catch (ex) {
    dispatch(setNotification(ex?.response?.data?.error ?? 'something went wrong', 'error'));
  }
};

export const commentBlog = (blogId, body) => async (dispatch) => {
  try {
    const commented = await commentService.create(blogId, { body });
    dispatch(comment({ id: blogId, comment: commented }));
    dispatch(setNotification(`commented created`, 'success'));
  } catch (ex) {
    dispatch(setNotification(ex?.response?.data?.error ?? 'something went wrong', 'error'));
  }
};

export const destroyBlog =
  ({ id, title, author }) =>
  async (dispatch) => {
    try {
      if (window.confirm(`Remove blog ${title} by ${author}`)) {
        await blogService.destroy(id);
        dispatch(destroy(id));
        dispatch(setNotification(`${title} blog is deleted`, 'success'));
      }
    } catch (ex) {
      dispatch(
        setNotification(ex?.response?.data?.error ?? "couldn't perform this acction", 'error'),
      );
    }
  };
