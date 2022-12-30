/* eslint-disable no-unused-expressions */
import { forwardRef, useImperativeHandle, useState } from 'react';
import { show, switcher, toggle } from '../utils/helpers';
import Button from './Button';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(props.visible ?? false);

  const toggleVisibility = toggle(visible, setVisible);

  if (ref) useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={switcher(visible)}>
        <Button onClick={toggleVisibility} label={props.btnLabel} />
      </div>
      <div style={show(visible)}>
        {props.children}
        <Button onClick={toggleVisibility} label='cancel' />
      </div>
    </div>
  );
});

Togglable.defaultProps = {
  ref: null,
};

export default Togglable;
