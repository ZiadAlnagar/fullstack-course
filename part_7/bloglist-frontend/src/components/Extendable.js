import { useState } from 'react';
import { toggle, show } from '../utils/helpers';
import Button from './Button';

const Extendable = (props) => {
  const [visible, setVisible] = useState(false);
  const { triggerContent, children } = props;

  const toggleBtnLabel = !visible ? 'view' : 'hide';

  return (
    <div>
      <div className='trigger'>
        {triggerContent}
        <Button onClick={toggle(visible, setVisible)} label={toggleBtnLabel} />
      </div>
      <div style={show(visible)} className='extendable'>
        {children}
      </div>
    </div>
  );
};

export default Extendable;
