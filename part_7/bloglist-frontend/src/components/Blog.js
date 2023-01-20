import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroyBlog, likeBlog } from '../reducers/blogReducer';
import H from './H';
import Comments from './Comments';
import LikeForm from './LikeForm';
import BlogDeleteForm from './BlogDeleteForm';

const Blog = ({ id }) => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth?.username);
  const blog = useSelector((state) => {
    const blogs = state.blogs;
    return blogs ? blogs.find((b) => b.id === id) : null;
  });

  const [curLikes, setCurLikes] = useState();
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    if (blog && username) {
      setCurLikes(blog.likes);
      setCanDelete(blog.user.username === username);
    }
  }, [blog, username]);

  const handleLike = async () => {
    setCurLikes(curLikes + 1);
    dispatch(likeBlog(blog, curLikes));
  };

  const handleDelete = (b) => () => dispatch(destroyBlog(b));

  if (!blog) return null;
  return (
    <div>
      <div>
        <H h={1} text={`${blog.title} ${blog.author}`} />
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <LikeForm onSubmit={handleLike} />
        </div>
        <div>added by {blog.user.name}</div>
        {canDelete ? <BlogDeleteForm onSubmit={handleDelete(blog)} /> : null}
      </div>
      <Comments id={id} />
    </div>
  );
};

export default Blog;
