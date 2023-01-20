import SimpleForm from './SimpleForm';

const BlogDeleteForm = ({ onSubmit }) => (
  <SimpleForm
    onSubmit={onSubmit}
    label='remove'
    style={{
      border: 'none',
      borderRadius: '6%',
      padding: '3px 8px',
      color: 'white',
      backgroundColor: 'DodgerBlue',
    }}
  />
);

export default BlogDeleteForm;
