import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { handleChange } from '../utils/helpers';
import H from './H';
import Input from './Input';
import Button from './Button';
import Togglable from './Togglable';

const BlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const blogFormRef = useRef();

  const handleBlogCreate = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    dispatch(createBlog(newBlog, () => blogFormRef.current.toggleVisibility()));
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <Togglable btnLabel='create new blog' ref={blogFormRef}>
      <H h={2} text='create new blog' />
      <form onSubmit={handleBlogCreate} id='blog-form'>
        <Input id='title' label='title:' onChange={handleChange(setTitle)} value={title} />
        <Input id='author' label='author:' onChange={handleChange(setAuthor)} value={author} />
        <Input id='url' label='url:' onChange={handleChange(setUrl)} value={url} />
        <Button type='submit' label='create' />
      </form>
    </Togglable>
  );
};

export default BlogForm;
