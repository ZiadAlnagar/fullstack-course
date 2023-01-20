import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { setNotification } from './notificationReducer';

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set(state, action) {
      return (state = action.payload);
    },
    destroy(state, action) {
      return null;
    },
  },
});

export const { set, destroy } = userReducer.actions;
export default userReducer.reducer;

export const setUser = (authObj) => async (dispatch) => {
  try {
    const authUser = await loginService.login(authObj);
    dispatch(set(authUser));
    blogService.setToken(authUser.token);
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(authUser));
    dispatch(setNotification(`Hello, ${authUser.name}`, 'success'));
  } catch (ex) {
    dispatch(setNotification(ex?.response?.data?.error ?? 'wrong credentials', 'error'));
  }
};

export const getUserFromCache = () => (dispatch) => {
  const loggedUserJSON = localStorage.getItem('loggedBlogAppUser');
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON);
    dispatch(set(loggedUser));
    blogService.setToken(loggedUser.token);
  }
};

export const destroyUser = () => (dispatch) => {
  dispatch(destroy());
  blogService.removeToken();
  window.localStorage.removeItem('loggedBlogAppUser');
  dispatch(setNotification('You have logged out successfully', 'success'));
};
