const Input = ({ label = null, onChange, value, id = null, placeholder = null, children }) => (
  <div>
    {label ? <span>{label}</span> : null}
    <input onChange={onChange} value={value} id={id} placeholder={placeholder} />
    {children}
  </div>
);

export default Input;
