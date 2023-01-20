import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    blogs: blogReducer,
    notification: notificationReducer,
  },
});

Object.defineProperty(window, 'reduxStore', {
  get() {
    return store.getState();
  },
});

export default store;
