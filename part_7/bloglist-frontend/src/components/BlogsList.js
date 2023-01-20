import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useSortBy } from '../hooks';
import { CardStyles, FlexContainer, StyledLink } from './Styles';

const BlogCard = styled(FlexContainer)`
  ${CardStyles}
  margin: 20px 0;
  padding-left: 20px;
  border-radius: 5px;
`;

const BlogsList = () => {
  const blogs = useSelector((state) => (state.blogs ? useSortBy(state.blogs, 'likes') : null));
  return (
    <div>
      {blogs
        ? blogs.map(({ id, title, author }) => (
            <BlogCard key={id} justifyContent='center' alignItems='center'>
              <StyledLink to={`/blogs/${id}`}>{`${title} ${author}`} </StyledLink>
            </BlogCard>
          ))
        : null}
    </div>
  );
};

export default BlogsList;
