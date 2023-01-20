import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { destroyUser } from '../reducers/authReducer';
import LogoutForm from './LogoutForm';

const StyledSpan = styled.span`
  font-size: 14px;
  margin: 0 10px 0 20px;
`;

const UserHeader = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(destroyUser());
  };

  if (!user) return null;
  return (
    <span>
      <StyledSpan>{user.name} logged in</StyledSpan>
      <LogoutForm onSubmit={handleLogout} />
    </span>
  );
};

export default UserHeader;
