import PropTypes from 'prop-types';
import BlogDeleteForm from './BlogDeleteForm';
import Extendable from './Extendable';
import LikeForm from './LikeForm';

const Blog = ({
  blog, like, destroy, canDelete,
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  let curLikes = blog.likes;

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: (curLikes += 1),
    };
    await like(updatedBlog);
  };

  const handleDelete = () => () => destroy(blog);

  return (
    <div style={blogStyle} className='blog'>
      <Extendable triggerContent={`${blog.title} ${blog.author}`}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <LikeForm onSubmit={handleLike} />
        </div>
        <div>{blog.user.name}</div>
        {canDelete ? <BlogDeleteForm onSubmit={handleDelete(blog)} /> : null}
      </Extendable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  like: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
};

Blog.defaultProps = {
  canDelete: false,
};

export default Blog;
