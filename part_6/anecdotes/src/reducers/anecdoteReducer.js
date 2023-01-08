import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';
import { setNotification } from './notificationReducer';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const toBeVoted = state.find((anecdote) => anecdote.id === id);
      const { votes } = toBeVoted;
      const voted = { ...toBeVoted, votes: votes + 1 };
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : voted));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { setAnecdotes, appendAnecdote, vote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.index();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdotes = await anecdoteService.create(content);
  dispatch(appendAnecdote(newAnecdotes));
  dispatch(setNotification(`new anecdote '${newAnecdotes.content}'`, 5));
};

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const { id } = anecdote;
  const updatedObj = { ...anecdote, votes: anecdote.votes + 1 };
  const updatedAnecdote = await anecdoteService.update(id, updatedObj);
  dispatch(vote(id));
  dispatch(setNotification(`you voted '${anecdote.content}' successfully`, 5));
};
