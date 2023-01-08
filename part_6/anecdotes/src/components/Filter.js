import { connect } from 'react-redux';
import { setFilter as assignFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const { filter, setFilter } = props;

  const handleChange = ({ target }) => {
    setFilter(target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  filter: state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  setFilter: (value) => {
    dispatch(assignFilter(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
