import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { CardStyles, StyledLink } from './Styles';
import H from './H';
import Table from './Table';
import THead from './THead';
import TBody from './TBody';
import TRow from './TRow';

const Container = styled.div`
  ${CardStyles}
  padding: 40px 15px 20px 15px;
`;

const padding = css`
  padding: 0 20px;
`;

const STHead = styled(THead)`
  padding: 0 20px;
`;

const Cell = styled.td`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${padding}
`;

const TRowLink = styled(TRow)`
  :hover {
    background: ${({ theme }) => theme.surface.bg_hover};
  }
`;

const TCellLink = ({ to, children }) => (
  <TRowLink>
    <Cell>
      <StyledLink to={to}>{children}</StyledLink>
    </Cell>
  </TRowLink>
);

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <H h={1} text='Users' />
      <Container>
        <Table>
          <STHead>
            <TRow>
              <td />
              <td>
                <span style={{ fontWeight: 'bold' }}>blogs created</span>
              </td>
            </TRow>
          </STHead>
          <TBody>
            {users
              ? users.map(({ id, name, blogs }) => (
                  <TCellLink key={id} to={`/users/${id}`}>
                    <span>{name}</span>
                    <span>{blogs.length}</span>
                  </TCellLink>
                ))
              : null}
          </TBody>
        </Table>
      </Container>
    </div>
  );
};

export default Users;
