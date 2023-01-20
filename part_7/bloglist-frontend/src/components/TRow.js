import styled, { css } from 'styled-components';
import { RoundedStyles } from './Styles';

const RowStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TRow = styled.tr`
  ${RowStyles}
  ${RoundedStyles}
`;

export default TRow;
