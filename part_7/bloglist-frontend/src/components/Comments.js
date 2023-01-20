import { useSelector } from 'react-redux';
import H from './H';
import CommentForm from './CommentForm';

const Comments = ({ id }) => {
  const comments = useSelector((state) => {
    const blog = state?.blogs?.find((b) => b.id === id);
    return blog?.comments;
  });

  return (
    <div>
      <H h={1} text='comments' />
      <CommentForm id={id} />
      <div>
        {comments ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.body}</li>
            ))}
          </ul>
        ) : (
          <p>be the first to comment :D</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
