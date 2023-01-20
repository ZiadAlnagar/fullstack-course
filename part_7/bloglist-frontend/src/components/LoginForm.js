import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleChange } from '../utils/helpers';
import { setUser } from '../reducers/authReducer';
import Button from './Button';
import Input from './Input';
import Togglable from './Togglable';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setUser({ username, password }));
    setUsername('');
    setPassword('');
  };

  return (
    <Togglable btnLabel='log in' visible>
      <form onSubmit={handleLogin} id='login-form'>
        <Input
          id='username'
          label='username'
          onChange={handleChange(setUsername)}
          value={username}
        />
        <Input
          id='password'
          label='password'
          onChange={handleChange(setPassword)}
          value={password}
        />
        <Button id='login-btn' type='submit' label='login' />
      </form>
    </Togglable>
  );
};

export default LoginForm;
