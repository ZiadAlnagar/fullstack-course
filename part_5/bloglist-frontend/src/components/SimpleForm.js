import Button from './Button';

const SimpleForm = ({ onSubmit, label, style = null }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form style={{ display: 'inline' }} onSubmit={handleSubmit}>
      <Button type='submit' label={label} style={style} />
    </form>
  );
};

export default SimpleForm;
