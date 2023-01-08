import { connect } from 'react-redux';
import { createAnecdote as create } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  const { createAnecdote } = props;
  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    createAnecdote(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filter: state.filter,
});

export default connect(mapStateToProps, { createAnecdote: create })(
  AnecdoteForm,
);
