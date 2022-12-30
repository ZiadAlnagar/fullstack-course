import SimpleForm from './SimpleForm';

const LogoutForm = ({ onSubmit }) => (
  <SimpleForm onSubmit={onSubmit} label='logout' />
);

export default LogoutForm;
