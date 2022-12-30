/* eslint-disable react/button-has-type */
const Button = ({
  id, type, onClick, label, style,
}) => (
  <button id={id} type={type} onClick={onClick} style={style}>
    {label}
  </button>
);

Button.defaultProps = {
  type: 'button',
  onClick: null,
  style: null,
};

export default Button;
