import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const FlexContainer = styled.div.attrs((props) => ({
  xAlign: props.align || props.xAlign,
  yAlign: props.align || props.yAlign,
}))`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.xAlign};
  align-items: ${(props) => props.yAlign};
`;

export const StyledLink = styled(Link)`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-self: center;
  padding: 25px 0;
  color: ${({ theme }) => (theme.mode === 'dark' ? theme.primary.bgHover : theme.primary.fgHover)};
  :hover {
    color: ${({ theme }) => theme.primary.bg};
  }
`;

export const RoundedStyles = css`
  border-radius: 5px;
`;

export const CardStyles = css`
  ${RoundedStyles}
  background: ${({ theme }) => theme.surface.bg};
`;

export default { FlexContainer, StyledLink };
