import LogoutForm from './LogoutForm';

const User = ({ user, onSubmit }) => (
  <div style={{ margin: '10px 0 30px 0' }}>
    <span>{user.name} logged in</span>
    <LogoutForm onSubmit={onSubmit} />
  </div>
);

export default User;
