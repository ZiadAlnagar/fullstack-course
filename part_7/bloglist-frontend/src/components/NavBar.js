import { WbSunny, DarkMode } from '@styled-icons/material-rounded';
import styled, { css } from 'styled-components';
import Button from './Button';
import UserHeader from './UserHeader';
import { FlexContainer, StyledLink } from './Styles';

const ThemeModeIconStyles = css`
  color: ${({ theme }) => theme.fg};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

const StyledSunIcon = styled(WbSunny).attrs((props) => ({
  size: props.size || '24px',
}))`
  ${ThemeModeIconStyles}
`;

const DarkModeIcon = styled(DarkMode).attrs((props) => ({
  size: props.size || '24px',
}))`
  ${ThemeModeIconStyles}
`;

const SIconBtn = styled(Button)`
  padding: 10px;
`;

const NavItemStyles = css`
  font-size: 18px;
  font-weight: bold;
`;

const NavLink = styled(StyledLink)`
  ${NavItemStyles}
  margin-right: 20px;
  text-decoration: ${({ theme }) => (theme.mode === 'light' ? `underline` : 'none')};
`;

const NavBar = ({ themeState }) => {
  const [theme, setTheme] = themeState;
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <FlexContainer xAlign='space-between' yAlign='center'>
      <FlexContainer>
        <NavLink to='/'>blogs</NavLink>
        <NavLink to='/users'>users</NavLink>
      </FlexContainer>
      <div>
        <SIconBtn onClick={themeToggler}>
          {theme === 'light' ? <StyledSunIcon /> : <DarkModeIcon />}
        </SIconBtn>
        <UserHeader />
      </div>
    </FlexContainer>
  );
};
export default NavBar;
