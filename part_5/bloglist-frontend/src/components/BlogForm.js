import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Header from './Header';
import { handleChange } from '../utils/helpers';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogCreate = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    await createBlog(newBlog);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <Header h={2} text='create new blog' />
      <form onSubmit={handleBlogCreate} id='blog-form'>
        <Input
          id='title'
          label='title:'
          onChange={handleChange(setTitle)}
          value={title}
        />
        <Input
          id='author'
          label='author:'
          onChange={handleChange(setAuthor)}
          value={author}
        />
        <Input
          id='url'
          label='url:'
          onChange={handleChange(setUrl)}
          value={url}
        />
        <Button type='submit' label='create' />
      </form>
    </div>
  );
};

export default BlogForm;
