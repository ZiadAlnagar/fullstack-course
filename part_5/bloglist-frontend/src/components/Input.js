const Input = ({
  label = null, onChange, value, id = null, placeholder = null,
}) => (
  <div>
    {label ? <span>{label}</span> : null}
    <input onChange={onChange} value={value} id={id} placeholder={placeholder} />
  </div>
);

export default Input;
