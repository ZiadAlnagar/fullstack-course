import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

export const notify = (content, type, duration = 5) => {
  const dispatch = useDispatch();
  dispatch(setNotification(content, type, duration));
};

export const handleChange =
  (setState) =>
  ({ target }) =>
    setState(target.value);

export const switcher = (visible) => ({ display: visible ? 'none' : '' });

export const show = (visible) => ({ display: visible ? '' : 'none' });

export const toggle = (state, setState) => () => setState(!state);

export const uri = (...path) => path.reduce((url, cur) => (url += `/${cur}`));

export default {
  handleChange,
  switcher,
  show,
  toggle,
};
