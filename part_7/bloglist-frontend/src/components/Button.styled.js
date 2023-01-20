import styled, { css } from 'styled-components';

const Button = styled.button`
  line-height: 1.2;
  padding: 12px 15px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border-color: transparent;
`;

const PrimaryHover = css`
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.primary.bgHover};
    color: ${({ theme }) => theme.primary.fg};
  }
`;

export const PrimaryBtn = styled(Button)`
  ${PrimaryHover}
  background: ${({ theme }) => theme.primary.bg};
  color: ${({ theme }) => theme.primary.fg};
`;

export default PrimaryBtn;
