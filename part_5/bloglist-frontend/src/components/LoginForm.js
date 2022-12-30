import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { handleChange } from '../utils/helpers';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
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
    </div>
  );
};

export default Login;
