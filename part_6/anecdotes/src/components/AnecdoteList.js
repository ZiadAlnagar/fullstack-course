/* eslint-disable no-nested-ternary */

import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter);

  // Anecdotes filtered, then sorted desc by votes
  const anecdotes = useSelector((state) => state.anecdotes
    .filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => (a.votes < b.votes ? 1 : a.votes > b.votes ? -1 : 0)));

  const handleVote = (anecdote) => () => {
    dispatch(voteAnecdote(anecdote));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button type='button' onClick={handleVote(anecdote)}>
          vote
        </button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
