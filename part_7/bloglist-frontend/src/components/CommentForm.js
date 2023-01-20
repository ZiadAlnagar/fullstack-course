import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentBlog } from '../reducers/blogReducer';
import { handleChange } from '../utils/helpers';
import Button from './Button';
import Input from './Input';

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState('');

  const handleCommentCreate = async (e) => {
    e.preventDefault();
    dispatch(commentBlog(id, body));
    setBody('');
  };

  return (
    <form onSubmit={handleCommentCreate}>
      <Input id='url' onChange={handleChange(setBody)} value={body}>
        <Button type='submit' label='add comment' />{' '}
      </Input>
    </form>
  );
};

export default CommentForm;
