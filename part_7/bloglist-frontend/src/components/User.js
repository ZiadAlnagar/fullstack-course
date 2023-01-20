import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showUser } from '../reducers/userReducer';
import H from './H';

const User = ({ id }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    const users = state.users;
    return users ? users.find((usr) => usr.id === id) : null;
  });

  useEffect(() => {
    dispatch(showUser(id));
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <H h={1} text={user.name} />
      <H h={2} text='added blogs' />
      <ul>
        {user.blogs.length > 0
          ? [...user.blogs].map((blog) => <li key={blog.id}>{blog.title}</li>)
          : "this user didn't add any blogs :("}
      </ul>
    </div>
  );
};

export default User;
