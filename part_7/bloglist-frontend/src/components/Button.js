import { PrimaryBtn } from './Button.styled';

const Button = ({ id, type, onClick, label, style, children, className }) => (
  <PrimaryBtn className={className} id={id} type={type} onClick={onClick} style={style}>
    <div>{label || children}</div>
  </PrimaryBtn>
);

Button.defaultProps = {
  type: 'button',
  className: null,
  id: null,
  onClick: null,
  style: null,
};

export default Button;
