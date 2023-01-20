import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body {
      font-family: 'IBM Plex Sans', Arial, Roboto, sans-serif;
      color: ${({ theme }) => theme.onBackground};
      background: ${({ theme }) => theme.background};
      width: 85%;
      margin: 0 auto;
      transition: all 0.5s linear;
    }

    a, a:visited, a:hover, a:active {
      text-decoration: none;
      outline: none;
    }
`;

export default GlobalStyles;
