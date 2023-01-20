import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    createNotification(state, action) {
      return (state = action.payload);
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const { createNotification, clearNotification } = notificationReducer.actions;
export default notificationReducer.reducer;

let displayTimer;

export const setNotification =
  (content, type, duration = 5) =>
  (dispatch) => {
    dispatch(createNotification({ content, type }));
    clearTimeout(displayTimer);
    displayTimer = setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
