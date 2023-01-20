import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return notification ? (
    <div style={style[notification.type]} className={notification.type}>
      {notification.content}
    </div>
  ) : null;
};

const style = {
  message: {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
};

style.success = {
  ...style.message,
  color: 'green',
};

style.error = {
  ...style.message,
  color: 'red',
};

export default Notification;
