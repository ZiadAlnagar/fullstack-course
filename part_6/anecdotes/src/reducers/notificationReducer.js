import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      const message = action.payload;
      return (state = message);
    },
    clearNotification(state) {
      return null;
    },
  },
});

export const { createNotification, clearNotification } = notificationReducer.actions;
export default notificationReducer.reducer;

let displayTimer;

export const setNotification = (content, duration) => (dispatch) => {
  dispatch(createNotification(content));
  clearTimeout(displayTimer);
  displayTimer = setTimeout(() => {
    dispatch(clearNotification());
  }, duration * 1000);
};
