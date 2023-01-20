import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userReducer = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    set(state, action) {
      return (state = action.payload);
    },
    update(state, action) {
      const updatedUser = action.payload;
      return state.map((user) => (user.id === updatedUser.id ? updatedUser : user));
    },
    destroy(state, action) {
      return null;
    },
  },
});

export const { set, update, destroy } = userReducer.actions;
export default userReducer.reducer;

export const initUsers = () => async (dispatch) => {
  const users = await userService.index();
  dispatch(set(users));
};

export const showUser = (id) => async (dispatch) => {
  try {
    const fetchedUser = await userService.show(id);
    dispatch(update(fetchedUser));
  } catch (ex) {
    /* empty */
  }
};
