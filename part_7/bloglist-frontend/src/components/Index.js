import { useSelector } from 'react-redux';
import styled from 'styled-components';
import H from './H';
import BlogForm from './BlogForm';
import LoginForm from './LoginForm';
import BlogsList from './BlogsList';

const StyledContainer = styled.div`
  width: 85%;
  margin: auto 0;
`;

const Index = () => {
  const user = useSelector((state) => state.auth);

  return (
    <StyledContainer>
      {!user ? (
        <div>
          <H h={1} text='log in to application' />
          <LoginForm />
        </div>
      ) : (
        <div>
          <H h={1} text='blogs' />
          <BlogForm />
          <BlogsList />
        </div>
      )}
    </StyledContainer>
  );
};

export default Index;
