import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useMatch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';
import { initBlogs } from './reducers/blogReducer';
import { getUserFromCache } from './reducers/authReducer';
import Index from './components/Index';
import NavBar from './components/NavBar';
import { initUsers } from './reducers/userReducer';
import Blog from './components/Blog';
import H from './components/H';
import GlobalStyles from './components/GlobalStyles';
import { lightTheme, darkTheme } from './components/Themes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFromCache());
    dispatch(initBlogs());
    dispatch(initUsers());
  }, []);

  const [theme, setTheme] = useState('dark');

  const userMatch = useMatch('/users/:id');
  const userId = userMatch?.params?.id;

  const blogMatch = useMatch('/blogs/:id');
  const blogId = blogMatch?.params?.id;

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div>
        <NavBar themeState={[theme, setTheme]} />
        <H h={1} text='blog app' />
        <Notification />
        <Routes>
          <Route path='/users/:id' element={<User id={userId} />} />
          <Route path='/users' element={<Users />} />
          <Route path='/blogs/:id' element={<Blog id={blogId} />} />
          <Route path='/' element={<Index />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
